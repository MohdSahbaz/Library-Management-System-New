import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { FileEdit, Trash, XCircle } from "lucide-react";
import Loader from "./loader/Loader";

const bookApiUrl = import.meta.env.VITE_API_URL_BOOK;

function SingleBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state.bookId || {};
  const [singleBook, setSingleBook] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Controls confirmation modal visibility

  const handleDeleteClick = () => {
    setShowConfirmModal(true); // Show confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      setButtonLoader(true);
      setMessage(null);
      setShowConfirmModal(false); // Hide modal on confirmation

      const response = await axios.delete(
        `${bookApiUrl}/delete-book/${bookId}`
      );

      setMessage(response?.data?.message);
      alert(response?.data?.message);
      navigate("/books"); // Redirect after deletion
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
      alert(error.response?.data?.message);
    } finally {
      setButtonLoader(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      if (!bookId) {
        setError("Invalid book ID");
        setLoader(false);
        return;
      }

      try {
        const response = await axios.get(`${bookApiUrl}/book/${bookId}`);
        setSingleBook(response.data);
      } catch (error) {
        setError(error?.response?.data?.message || "Book not found");
      } finally {
        setLoader(false);
      }
    };

    getData();
  }, [bookId]);

  if (loader) {
    return (
      <>
        <Header pageName="Book Detail" />
        <div className="container mx-auto pb-6 px-2">
          <Loader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header pageName="Book Detail" />
        <div className="container mx-auto p-6 text-center text-red-500">
          {error}
        </div>
      </>
    );
  }

  return (
    <>
      <Header pageName="Book Detail" />
      <div className="mx-auto max-w-4xl relative p-6 bg-gray-800 shadow-lg rounded-lg mt-10 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Book Image */}
          <div>
            <img
              src={singleBook?.imageUrl}
              alt={singleBook?.title}
              className="w-full h-auto rounded-lg shadow-md border-4 border-gray-600 max-w-48"
            />
          </div>

          {/* Book Details */}
          <div>
            <h1 className="text-3xl font-bold text-white">
              {singleBook?.title}
            </h1>
            <p className="text-lg text-gray-400 mt-2">
              by {singleBook?.author}
            </p>
            <p className="mt-4 text-gray-300">{singleBook?.description}</p>
            <p className="mt-2 text-gray-400 font-semibold">
              Genre: {singleBook?.genre}
            </p>
            <p className="mt-2 text-gray-400 font-semibold">
              Copies Available: {singleBook?.copiesAvailable}
            </p>
            <p className="mt-2 text-gray-400 font-semibold">
              Sales Count: {singleBook?.salesCount}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="fixed md:bottom-10 bottom-24 md:right-10 right-5">
            <div className="flex flex-col gap-4">
              <FileEdit
                size={50}
                className="cursor-pointer bg-green-700 text-white p-2 rounded-full hover:bg-green-600"
                onClick={() => navigate(`/edit-book/${bookId}`)}
              />
              <Trash
                size={50}
                className="cursor-pointer bg-red-700 text-white p-2 rounded-full hover:bg-red-600"
                onClick={handleDeleteClick} // Opens confirmation modal
              />
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 flex items-center px-2 justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h2 className="text-lg font-bold text-white">Confirm Deletion</h2>
              <p className="text-gray-400 mt-2">
                Are you sure you want to delete this book?
              </p>

              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={handleConfirmDelete}
                  disabled={buttonLoader}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                >
                  {buttonLoader ? "Deleting..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>

              <XCircle
                size={24}
                className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-white"
                onClick={() => setShowConfirmModal(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SingleBook;
