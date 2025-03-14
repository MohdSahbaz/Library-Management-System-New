import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/common/loader/Loader";

const BookList = ({ books, loader, heading }) => {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <h1 className="text-lg mb-4 text-gray-200">{heading}</h1>

      {loader ? (
        <Loader />
      ) : books && books.length > 0 ? (
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-gray-800 rounded-sm shadow-md p-4 flex items-start hover:bg-gray-700 transition"
            >
              {/* Book Image */}
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-md shadow-md mr-4 cursor-pointer"
                onClick={() =>
                  navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                    state: { bookId: book._id },
                  })
                }
              />

              {/* Book Details */}
              <div className="flex-1">
                <h2
                  className="text-lg font-semibold cursor-pointer text-gray-100 hover:text-gray-300"
                  onClick={() =>
                    navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                      state: { bookId: book._id },
                    })
                  }
                >
                  {book.title}
                </h2>
                <p className="text-gray-400 text-sm">
                  <strong>Borrowed:</strong>{" "}
                  {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                </p>
                <p className="text-gray-300 text-sm">
                  <strong>Due:</strong>{" "}
                  {new Date(book.dueDate).toLocaleDateString("en-GB")}
                </p>
                <p>
                  <strong>Fine:</strong> ₹{book.fine || 0}
                </p>
                <p
                  className={`text-sm font-semibold mt-2 ${
                    book.status === "pending"
                      ? "text-yellow-500"
                      : book.status === "borrowed"
                      ? "text-blue-400"
                      : book.status === "returned"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  Status:{" "}
                  {book.status === "pending"
                    ? "Pending"
                    : book.status === "borrowed"
                    ? "Borrowed"
                    : book.status === "returned"
                    ? "Returned"
                    : book.status === "overdue"
                    ? "Overdue"
                    : "Unknown"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No books found</p>
      )}
    </div>
  );
};

export default BookList;
