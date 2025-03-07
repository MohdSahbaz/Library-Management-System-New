import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const borrowApiUrl = import.meta.env.VITE_API_URL_BORROW;

const Borrowed = () => {
  const [pendingBook, setPendingBook] = useState(null);
  const [loader, setLoader] = useState(true);
  const [returningBook, setReturningBook] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastType, setToastType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("librarianToken");

    const getData = async () => {
      try {
        const response = await axios.get(`${borrowApiUrl}/borrowed`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingBook(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      } finally {
        setLoader(false);
      }
    };

    getData();
  }, []);

  const handleReturn = async (borrowId) => {
    const token = localStorage.getItem("librarianToken");
    try {
      setReturningBook(borrowId);
      await axios.put(
        `${borrowApiUrl}/return`,
        { borrowId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingBook((prev) => prev.filter((book) => book._id !== borrowId));
      showToast("Book returned successfully!", "success");
    } catch (error) {
      showToast("Failed to return book.", "error");
    } finally {
      setReturningBook(null);
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
        <Header pageName={"Borrowed"} />
        <div className="container mx-auto pb-6 px-2">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <Header pageName={"Borrowed"} />
      {toastMessage && (
        <div
          className={`fixed top-10 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded shadow-lg text-white text-base font-semibold transition-all duration-300
          ${toastType === "success" ? "bg-gray-700" : "bg-gray-900"}`}
        >
          {toastMessage}
        </div>
      )}

      <div className="mx-auto pb-6 md:px-6 p-2 fade-in">
        <h1 className="text-lg mb-4">Borrowed Books</h1>

        {pendingBook && pendingBook.length > 0 ? (
          <div className="space-y-4">
            {pendingBook.map((book) => (
              <div
                key={book._id}
                className="bg-gray-800/[0.5] rounded-sm shadow-md p-4 flex items-start hover:bg-gray-700 transition"
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
                    <strong>Borrow Date:</strong>{" "}
                    {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <strong>Due Date:</strong>{" "}
                    {new Date(book.dueDate).toLocaleDateString("en-GB")}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-2 ${
                      book.status === "borrowed"
                        ? "text-gray-300"
                        : "text-gray-400"
                    }`}
                  >
                    Status:{" "}
                    {book.status === "borrowed" ? "Borrowed" : "Returned"}
                  </p>

                  <div className="mt-4">
                    <button
                      disabled={returningBook === book._id}
                      onClick={() => handleReturn(book._id)}
                      className={`text-white px-4 py-2 rounded-sm transition duration-300 flex items-center justify-center min-w-[100px]
                        ${
                          returningBook === book._id
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gray-500 hover:bg-gray-400"
                        } `}
                    >
                      {returningBook === book._id ? (
                        <span className="h-5 w-5 animate-spin rounded-full border-[3px] border-white border-t-transparent"></span>
                      ) : (
                        "Return"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-4">
            No borrowed books found.
          </p>
        )}
      </div>
    </>
  );
};

export default Borrowed;
