import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const borrowApiUrl = import.meta.env.VITE_API_URL_BORROW;

const Pending = () => {
  const [pendingBook, setPendingBook] = useState(null); // Initialize state properly
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [confirmingBook, setConfirmingBook] = useState(null); // Track which book is being confirmed
  const [cancellingBook, setCancellingBook] = useState(null); // Track which book is being canceled

  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null); // 'success' or 'error'

  useEffect(() => {
    const token = localStorage.getItem("librarianToken"); // Retrieve token

    const getData = async () => {
      try {
        const response = await axios.get(`${borrowApiUrl}/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingBook(response.data); // Save data in state
      } catch (error) {
        console.error("Error fetching pending books:", error);
      } finally {
        setLoader(false); // Stop loader after fetching
      }
    };

    getData();
  }, []);

  const handleConfirm = async (borrowId) => {
    const token = localStorage.getItem("librarianToken"); // Retrieve token
    try {
      setConfirmingBook(borrowId); // Set loading for this book
      await axios.put(
        `${borrowApiUrl}/confirm`,
        { borrowId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove confirmed book from the pending list
      setPendingBook((prev) => prev.filter((book) => book._id !== borrowId));
      showToast("Book confirmed successfully!", "success"); // Show success message
    } catch (error) {
      showToast("Failed to confirm book.", "error"); // Show error message
    } finally {
      setConfirmingBook(null); // Reset confirming book state
    }
  };

  const handleCancel = async (borrowId) => {
    const token = localStorage.getItem("librarianToken"); // Retrieve token
    try {
      setCancellingBook(borrowId); // Set loading state for this book
      await axios.put(
        `${borrowApiUrl}/cancel`,
        { borrowId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Remove canceled book from the pending list
      setPendingBook((prev) => prev.filter((book) => book._id !== borrowId));
      showToast("Book request canceled!", "success"); // Show success message
    } catch (error) {
      showToast("Failed to cancel book request.", "error"); // Show error message
    } finally {
      setCancellingBook(null); // Reset canceling book state
    }
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);

    setTimeout(() => {
      setToastMessage(null);
    }, 2000); // Hide after 2 seconds
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
      {toastMessage && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-2 rounded shadow-lg text-white text-base font-semibold transition-all duration-300
          ${toastType === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toastMessage}
        </div>
      )}

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
                  <div className="mt-4 flex md:gap-8 gap-4 w-full flex-wrap">
                    <button
                      disabled={confirmingBook === book._id}
                      onClick={() => handleConfirm(book._id)}
                      className={`text-white px-4 py-2 rounded-sm transition duration-300 flex items-center justify-center min-w-[100px]
                        ${
                          confirmingBook === book._id
                            ? "bg-blue-900 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        } `}
                    >
                      {confirmingBook === book._id ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-white border-t-transparent"></span>
                      ) : (
                        "Confirm"
                      )}
                    </button>
                    <button
                      disabled={cancellingBook === book._id}
                      onClick={() => handleCancel(book._id)}
                      className={`text-white px-4 py-2 rounded-sm transition duration-300 flex items-center justify-center min-w-[100px]
                      ${
                        cancellingBook === book._id
                          ? "bg-red-900 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } `}
                    >
                      {cancellingBook === book._id ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-white border-t-transparent"></span>
                      ) : (
                        "Cancel"
                      )}
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
