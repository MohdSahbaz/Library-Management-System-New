import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../loader/Loader";
import { useLocation } from "react-router-dom";
import BookCard from "../../../pages/books/BookCard";
import MostSoldBooks from "../../../pages/books/MostSoldBooks";
import "../../animations/animations.css";

const SingleBook = () => {
  const location = useLocation();
  const bookId = location.state?.bookId;
  const [book, setBook] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookDetails = async () => {
    setLoader(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/books/book/${bookId}`
      );
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

  return (
    <>
      <div
        className={`flex justify-center items-center bg-emerald-50 p-6 fade-in`}
      >
        {loader && <Loader />}
        {error && <h1>{error}</h1>}
        {book && !error && (
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Borrow
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <MostSoldBooks />
    </>
  );
};

export default SingleBook;
