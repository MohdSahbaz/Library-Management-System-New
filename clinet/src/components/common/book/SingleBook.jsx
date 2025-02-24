import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import Loader from "../loader/Loader";
import MostSoldBooks from "../../../pages/books/MostSoldBooks";
import "../../animations/animations.css";
import ReviewAndRating from "./ReviewAndRating";

const bookApiUrl = import.meta.env.VITE_API_URL_BOOK;
const borrowApiUrl = import.meta.env.VITE_API_URL_BORROW;

const SingleBook = () => {
  const location = useLocation();
  const bookId = location.state?.bookId;
  const [book, setBook] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [borrowError, setBorrowError] = useState(null);
  const [borrowLoader, setBorrowLoader] = useState(false);

  const fetchBookDetails = async () => {
    setLoader(true);
    setError(null);
    try {
      const response = await axios.get(`${bookApiUrl}/book/${bookId}`);
      setBook(response.data);
    } catch (error) {
      setError("Book not found");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchBookDetails();
    window.scrollTo(0, 0);
  }, [bookId]);

  const handleBorrow = async () => {
    setBorrowError(null);
    setBorrowLoader(true);

    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
      setBorrowError("Please log in.");
      setBorrowLoader(false);
      return;
    }

    // Decode the token to get user ID
    let userId;
    try {
      const decoded = jwtDecode(token);

      userId = decoded?.id;
    } catch (error) {
      setBorrowError("Invalid token. Please log in again.");
      setBorrowLoader(false);
      return;
    }

    if (!book || !book._id) {
      setBorrowLoader(false);
      return;
    }

    try {
      await axios.post(
        `${borrowApiUrl}/borrow`,
        {
          userId,
          bookId: book._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBorrowError(
        "Borrow request submitted! 📖 Please visit the library with your address proof to collect your book. Happy reading! 📚✨"
      );
    } catch (error) {
      setBorrowError(error.response?.data?.message || "Failed to borrow book");
    } finally {
      setBorrowLoader(false);
    }
  };

  useEffect(() => {
    if (borrowError) {
      const timer = setTimeout(() => {
        setBorrowError(null);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [borrowError]);

  const handleDownload = () => {
    if (book?.downloadUrl) {
      const link = document.createElement("a");
      link.href = book.downloadUrl;
      link.setAttribute("download", book.title || "Book.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] bg-emerald-50 p-6">
      <div className={`flex justify-center items-center bg-emerald-50 fade-in`}>
        {loader && <Loader />}
        {error && <h1>{error}</h1>}
        {book && !error && !loader && (
          <div className="bg-emerald-100/[0.5] shadow-md rounded-sm overflow-hidden flex flex-col md:flex-row w-full max-w-8xl">
            {/* Left: Book Image */}
            <div className="w-full md:w-1/3 p-4">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="h-60 object-cover rounded-sm"
              />
            </div>

            {/* Right: Book Details */}
            <div className="p-6 w-full">
              <h1 className="text-3xl font-semibold">
                {book.title || "No title"}
              </h1>
              <h2 className="italic">by {book.author || "Unknown"}</h2>
              <p className="mt-2">{book.description || "...."}</p>

              {/* Book Info */}
              <div className="mt-2">
                <p>
                  <strong>Genre:</strong> {book.genre || "Unknown"}
                </p>
                {book.copiesAvailable ? (
                  <p>
                    <strong>Available:</strong> {book.copiesAvailable}
                  </p>
                ) : (
                  <p className="text-red-600">
                    <strong className="text-emerald-900">Available:</strong> Not
                    Available
                  </p>
                )}
                <p>
                  <strong>Readers:</strong> {book.salesCount || "Undefine"}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                <button
                  disabled={borrowLoader}
                  onClick={handleBorrow}
                  className={`text-white px-4 py-2 rounded-sm transition duration-300 flex items-center justify-center min-w-[100px]
                    ${
                      borrowLoader
                        ? "bg-blue-900 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-800"
                    } `}
                >
                  {borrowLoader ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-white border-t-transparent"></span>
                  ) : (
                    "Borrow"
                  )}
                </button>

                <button
                  disabled={!book?.downloadUrl}
                  onClick={handleDownload}
                  className={`text-white px-4 py-2 rounded-sm transition
                    ${
                      !book?.downloadUrl
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 cursor-pointer"
                    }`}
                >
                  Download
                </button>
              </div>

              <h1 className="text-red-600">{borrowError}</h1>
            </div>
          </div>
        )}
      </div>
      {book && <ReviewAndRating bookId={book._id} />}
      <MostSoldBooks />
    </div>
  );
};

export default SingleBook;
