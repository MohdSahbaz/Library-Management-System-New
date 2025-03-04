import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const pendingApiUrl = import.meta.env.VITE_API_URL_BORROW;

const Pending = () => {
  const [pendingBook, setPendingBook] = useState(null); // Initialize state properly
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("librarianToken"); // ✅ Retrieve token

    const getData = async () => {
      try {
        const response = await axios.get(`${pendingApiUrl}/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingBook(response.data); // ✅ Save data in state
      } catch (error) {
        console.error("Error fetching pending books:", error);
      } finally {
        setLoader(false); // ✅ Stop loader after fetching
      }
    };

    getData(); // ✅ Call the function correctly
  }, []); // ✅ Empty dependency array to ensure it runs only once

  const handleConfirm = (bookId) => {
    console.log("Confirmed book:", bookId);
    // Implement confirm action (e.g., API call)
  };

  const handleCancel = (bookId) => {
    console.log("Canceled book:", bookId);
    // Implement cancel action (e.g., API call)
  };

  if (loader) {
    return (
      <>
        <Header pageName={"Pending"} />
        <div className="container mx-auto pb-6 px-2">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <Header pageName="Pending" />
      <div className="mx-auto pb-6 md:px-6 p-2 fade-in">
        <h1 className="text-lg mb-4">Pending Books</h1>

        {pendingBook && pendingBook.length > 0 ? (
          <div className="space-y-4">
            {pendingBook.map((book) => (
              <div
                key={book._id}
                className="bg-emerald-200/[0.5] rounded-sm shadow-md p-4 flex items-start hover:bg-emerald-100 transition"
              >
                {/* Book Image */}
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-sm shadow-md mr-4 cursor-pointer hover:scale-110 transition-all duration-300"
                  onClick={() =>
                    navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                      state: { bookId: book._id },
                    })
                  }
                />

                {/* Book/User Details */}
                <div className="flex-1">
                  <h2
                    className="text-lg font-semibold cursor-pointer hover:text-emerald-600"
                    onClick={() =>
                      navigate(`/users/${book.userName.replace(/\s+/g, "-")}`, {
                        state: { userId: book.userId },
                      })
                    }
                  >
                    User: {book.userName}
                  </h2>

                  <h2
                    className="text-base font-semibold cursor-pointer hover:text-emerald-600"
                    onClick={() =>
                      navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                        state: { bookId: book._id },
                      })
                    }
                  >
                    Book: {book.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    <strong>Requested:</strong>{" "}
                    {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-2 ${
                      book.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    Status: {book.status === "pending" ? "Pending" : "Borrowed"}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handleConfirm(book._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 transition"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleCancel(book._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-sm hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-4">
            No pending books found.
          </p>
        )}
      </div>
    </>
  );
};

export default Pending;
