import Header from "../../components/common/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const borrowApiUrl = import.meta.env.VITE_API_URL_BORROW;

const Borrowed = () => {
  const [pendingBook, setPendingBook] = useState(null);
  const [loader, setLoader] = useState(true);
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

  const handleReturn = (bookId) => {
    console.log("Returned book:", bookId);
    // Implement return action (e.g., API call)
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
      <div className="mx-auto pb-6 md:px-6 p-2 fade-in">
        <h1 className="text-lg mb-4">Borrowed Books</h1>

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
                      state: { bookId: book.bookId },
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
                        state: { bookId: book.bookId },
                      })
                    }
                  >
                    Book: {book.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    <strong>Borrow Date:</strong>{" "}
                    {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <strong>Due Date:</strong>{" "}
                    {new Date(book.dueDate).toLocaleDateString("en-GB")}
                  </p>
                  <p
                    className={`text-sm font-semibold mt-2 ${
                      book.status === "borrowed"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    Status:{" "}
                    {book.status === "borrowed" ? "Borrowed" : "Returned"}
                  </p>

                  {/* Return Button */}
                  <div className="mt-4">
                    <button
                      onClick={() => handleReturn(book._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-sm hover:bg-blue-600 transition"
                    >
                      Return
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-4">
            No borrowed books found.
          </p>
        )}
      </div>
    </>
  );
};

export default Borrowed;
