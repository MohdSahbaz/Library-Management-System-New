import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const borrowApiUrl = import.meta.env.VITE_API_URL_BORROW;

const Overdue = () => {
  const [pendingBook, setPendingBook] = useState(null);
  const [loader, setLoader] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("librarianToken");

    const getData = async () => {
      try {
        const response = await axios.get(`${borrowApiUrl}/overdue`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingBook(response.data);
      } catch (error) {
        console.error("Error fetching overdue books:", error);
      } finally {
        setLoader(false);
      }
    };

    getData();
  }, []);

  const handleClear = async (book) => {
    const token = localStorage.getItem("librarianToken");
    try {
      await axios.put(
        `${borrowApiUrl}/clearoverdue`,
        { userId: book.userId, bookId: book.bookId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPendingBook((prev) => prev.filter((b) => b._id !== book._id));
      showToast("Book cleared successfully!", "success");
    } catch (error) {
      showToast("Failed to clear book.", "error");
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
        <Header pageName="Overdue" />
        <div className="container mx-auto pb-6 px-2">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <Header pageName="Overdue" />

      {toastMessage && (
        <div
          className={`fixed top-10 z-50 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg text-white text-base font-semibold transition-all duration-300
          ${toastType === "success" ? "bg-gray-700" : "bg-red-600"}`}
        >
          {toastMessage}
        </div>
      )}

      <div className="mx-auto pb-6 md:px-6 p-2 fade-in min-h-[calc(100vh-74px)]">
        <h1 className="text-lg mb-4">Overdue Books</h1>

        {pendingBook && pendingBook.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {pendingBook.map((book) => (
              <div
                key={book._id}
                className="bg-gray-800/[0.5] rounded-sm shadow-md p-4 flex items-start hover:bg-gray-700 transition"
              >
                {/* Book Image */}
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

                {/* Book/User Details */}
                <div className="flex-1">
                  <h2
                    className="text-lg font-semibold cursor-pointer hover:text-gray-300"
                    onClick={() =>
                      navigate(`/users/${book.userName.replace(/\s+/g, "-")}`, {
                        state: { userId: book.userId },
                      })
                    }
                  >
                    User: {book.userName}
                  </h2>

                  <h2
                    className="text-base font-semibold cursor-pointer hover:text-gray-300"
                    onClick={() =>
                      navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                        state: { bookId: book.bookId },
                      })
                    }
                  >
                    Book: {book.title}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    <strong>Fine:</strong> {book.fine}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <strong>Borrow Date:</strong>{" "}
                    {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <strong>Due Date:</strong>{" "}
                    {new Date(book.dueDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-red-400 text-sm font-semibold mt-2">
                    Status: Overdue
                  </p>

                  {/* Clear Button */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleClear(book)}
                      className="bg-gray-600 text-white py-2 px-4 rounded-sm hover:bg-gray-500 transition"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-4">
            No overdue books found.
          </p>
        )}
      </div>
    </>
  );
};

export default Overdue;
