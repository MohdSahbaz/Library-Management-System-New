import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Edit, Trash2 } from "lucide-react";
import Loader from "./loader/Loader";

const bookApiUrl = import.meta.env.VITE_API_URL_BOOK;

function SingleBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state.bookId || {};
  const [singleBook, setSingleBook] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="mx-auto max-w-4xl p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 shadow-lg rounded-lg mt-10 text-gray-300">
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
              <Edit
                size={40}
                className="cursor-pointer bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600"
                onClick={() => navigate(`/edit-book/${bookId}`)}
              />
              <Trash2
                size={40}
                className="cursor-pointer bg-red-700 text-white p-2 rounded-full hover:bg-red-600"
                onClick={() => console.log("Delete book:", bookId)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBook;
