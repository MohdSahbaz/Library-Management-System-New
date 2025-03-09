import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const borrowApiUrl = import.meta.env.VITE_API_URL_BORROW;

const Pending = () => {
  const [pendingBook, setPendingBook] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const [confirmingBook, setConfirmingBook] = useState(null);
  const [cancellingBook, setCancellingBook] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("librarianToken");
    const getData = async () => {
      try {
        const response = await axios.get(`${borrowApiUrl}/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingBook(response.data);
      } catch (error) {
        console.error("Error fetching pending books:", error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  const handleConfirm = async (borrowId) => {
    const token = localStorage.getItem("librarianToken");
    try {
      setConfirmingBook(borrowId);
      await axios.put(
        `${borrowApiUrl}/confirm`,
        { borrowId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingBook((prev) => prev.filter((book) => book._id !== borrowId));
      showToast("Book confirmed successfully!", "success");
    } catch (error) {
      showToast("Failed to confirm book.", "error");
    } finally {
      setConfirmingBook(null);
    }
  };

  const handleCancel = async (borrowId) => {
    const token = localStorage.getItem("librarianToken");
    try {
      setCancellingBook(borrowId);
      await axios.put(
        `${borrowApiUrl}/cancel`,
        { borrowId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingBook((prev) => prev.filter((book) => book._id !== borrowId));
      showToast("Book request canceled!", "success");
    } catch (error) {
      showToast("Failed to cancel book request.", "error");
    } finally {
      setCancellingBook(null);
    }
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  if (loader) {
    return (
      <>
        <Header pageName="Pending" />
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
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg text-white text-base font-semibold transition-all duration-300 ${
            toastType === "success" ? "bg-gray-700" : "bg-red-600"
          }`}
        >
          {toastMessage}
        </div>
      )}
      <div className="mx-auto pb-6 md:px-6 p-2 fade-in min-h-[calc(100vh-74px)]">
        <h1 className="text-lg mb-4 text-white">Pending Books</h1>
        {pendingBook && pendingBook.length > 0 ? (
          <div className="space-y-4">
            {pendingBook.map((book) => (
              <div
                key={book._id}
                className="bg-gray-800 rounded-sm shadow-md p-4 flex items-start hover:bg-gray-700 transition text-white"
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-sm shadow-md mr-4 cursor-pointer hover:scale-110 transition-all duration-300"
                  onClick={() =>
                    navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                      state: { bookId: book.bookId },
                    })
                  }
                />
                <div className="flex-1">
                  <h2
                    className="text-lg font-semibold cursor-pointer hover:text-gray-400"
                    onClick={() =>
                      navigate(`/users/${book.userName.replace(/\s+/g, "-")}`, {
                        state: { userId: book.userId },
                      })
                    }
                  >
                    User: {book.userName}
                  </h2>
                  <h2
                    className="text-base font-semibold cursor-pointer hover:text-gray-400"
                    onClick={() =>
                      navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                        state: { bookId: book.bookId },
                      })
                    }
                  >
                    Book: {book.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    <strong>Requested:</strong>{" "}
                    {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-2 ${
                      book.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    Status: {book.status === "pending" ? "Pending" : "Borrowed"}
                  </p>
                  <div className="mt-4 flex md:gap-8 gap-4 w-full flex-wrap">
                    <button
                      disabled={confirmingBook === book._id}
                      onClick={() => handleConfirm(book._id)}
                      className={`text-white px-4 py-2 rounded-sm transition duration-300 flex items-center justify-center min-w-[100px] ${
                        confirmingBook === book._id
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gray-500 hover:bg-gray-400"
                      }`}
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
                      className={`text-white px-4 py-2 rounded-sm transition duration-300 flex items-center justify-center min-w-[100px] ${
                        cancellingBook === book._id
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gray-500 hover:bg-gray-400"
                      }`}
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
          <p className="text-center text-gray-400 py-4">
            No pending books found.
          </p>
        )}
      </div>
    </>
  );
};

export default Pending;
