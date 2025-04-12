import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const ratingApiUrl = import.meta.env.VITE_API_URL_RATING;
const reviewApiUrl = import.meta.env.VITE_API_URL_REVIEW;

const ReviewAndRating = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(null);
  const [totalRating, setTotalRating] = useState(0);
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
    if (ratingError) setTimeout(() => setRatingError(null), 5000);
  }, [ratingError]);

  useEffect(() => {
    if (reviewError) setTimeout(() => setReviewError(null), 5000);
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

      const avgRating = Number(response.data.averageRating) || 0;
      const total = Number(response.data.totalRatings) || 0;

      setAverageRating(avgRating);
      setTotalRating(total);
    } catch (error) {
      setRatingError("Failed to load rating.");
    }
  };

  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        setUser(jwtDecode(token));
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
      setRating(1);
    }
  };

  const submitReview = async () => {
    if (!user) {
      setReviewError("Please log in to add a review.");
      return;
    }

    if (!comment.trim()) {
      setReviewError("Please enter a valid comment.");
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
    } catch (error) {
      setReviewError(
        error?.response?.data?.message || "Failed to submit review."
      );
    } finally {
      setLoadingReview(false);
      setComment("");
    }
  };

  return (
    <div className="bg-emerald-100/[0.5] p-6 border-t border-black rounded-sm shadow-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-emerald-900">
          Rate This Book
        </h2>
        <Box sx={{ mt: 2 }}>
          <Typography component="legend">Average Rating</Typography>
          <Rating
            name="read-only"
            value={averageRating || 0}
            precision={0.5}
            readOnly
            sx={{
              color:
                averageRating >= 4
                  ? "green"
                  : averageRating >= 3
                  ? "orange"
                  : "red",
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {totalRating > 0
              ? `Based on ${totalRating} ${
                  totalRating === 1 ? "rating" : "ratings"
                }`
              : "No ratings yet"}
          </Typography>
          <Divider />
          {user && (
            <>
              <Typography component="legend">Give Rating</Typography>
              <Rating
                name="dynamic-rating"
                value={rating}
                onChange={(event, newValue) =>
                  setRating(newValue < 1 ? 1 : newValue)
                }
                sx={{
                  color: rating >= 4 ? "green" : rating >= 3 ? "orange" : "red",
                }}
              />
            </>
          )}
        </Box>

        {user && (
          <button
            onClick={submitRating}
            disabled={loadingRating}
            className="mt-2 bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-sm disabled:opacity-50"
          >
            {loadingRating ? "Submitting..." : "Submit Rating"}
          </button>
        )}
        {ratingError && <p className="text-red-600 mt-2">{ratingError}</p>}
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-emerald-900">Reviews</h2>
        {user && (
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded-sm border-emerald-700 bg-transparent focus:outline-emerald-300"
              rows="3"
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            {reviewError && <p className="text-red-500">{reviewError}</p>}
            <button
              onClick={submitReview}
              disabled={loadingReview}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-sm disabled:opacity-50"
            >
              {loadingReview ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        )}
        <div className="mt-6 max-h-48 overflow-y-auto">
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review._id}
                className="mt-4 p-3 bg-emerald-200/[0.5] rounded-sm shadow-sm"
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
