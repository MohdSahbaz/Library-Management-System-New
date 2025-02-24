import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ratingApiUrl = import.meta.env.VITE_API_URL_RATING;
const reviewApiUrl = import.meta.env.VITE_API_URL_REVIEW;

const ReviewAndRating = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingRating, setLoadingRating] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const [ratingError, setRatingError] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchReviews();
    fetchAverageRating();
    checkUser();
  }, [bookId]);

  useEffect(() => {
    if (ratingError) {
      setTimeout(() => setRatingError(null), 5000);
    }
  }, [ratingError]);

  useEffect(() => {
    if (reviewError) {
      setTimeout(() => setReviewError(null), 5000);
    }
  }, [reviewError]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${reviewApiUrl}/${bookId}`);
      setReviews(response.data);
    } catch (error) {
      setReviewError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAverageRating = async () => {
    try {
      const response = await axios.get(`${ratingApiUrl}/average/${bookId}`);
      setAverageRating(response.data.averageRating);
    } catch (error) {
      setRatingError("Failed to load rating.");
    }
  };

  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  };

  const submitRating = async () => {
    if (!user) {
      setRatingError("Please log in to rate.");
      return;
    }
    setLoadingRating(true);

    try {
      await axios.post(
        `${ratingApiUrl}/add`,
        { bookId, rating },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchAverageRating();
    } catch (error) {
      setRatingError(
        error?.response?.data?.message || "Failed to submit rating."
      );
    } finally {
      setLoadingRating(false);
    }
  };

  const submitReview = async () => {
    if (!user) {
      setReviewError("Please log in to add a review.");
      return;
    }
    setLoadingReview(true);

    try {
      await axios.post(
        `${reviewApiUrl}/add`,
        { bookId, comment },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchReviews();
      setComment("");
    } catch (error) {
      setReviewError(
        error?.response?.data?.message || "Failed to submit review."
      );
    } finally {
      setLoadingReview(false);
    }
  };

  return (
    <div className="bg-emerald-100/[0.5] p-6 mt-8 rounded-md shadow-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-emerald-900">
          Rate This Book
        </h2>
        <p className="mt-2">
          <strong>Average Rating:</strong> {averageRating || "Not Rated Yet"}
        </p>
        {user && (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              onClick={submitRating}
              disabled={loadingRating}
              className="mt-2 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loadingRating ? "Submitting..." : "Submit Rating"}
            </button>
            {ratingError && <p className="text-red-600 mt-2">{ratingError}</p>}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-emerald-900">Reviews</h2>
        {user && (
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-md"
              rows="3"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={submitReview}
              disabled={loadingReview}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loadingReview ? "Submitting..." : "Submit Review"}
            </button>
            {reviewError && <p className="text-red-600 mt-2">{reviewError}</p>}
          </div>
        )}
        <div className="mt-6">
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="mt-4 p-3 bg-emerald-200/[0.5] rounded-md shadow-sm"
              >
                <p className="text-gray-800">
                  <strong>{review.userId?.name || "Anonymous"}:</strong>{" "}
                  {review.comment}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewAndRating;
