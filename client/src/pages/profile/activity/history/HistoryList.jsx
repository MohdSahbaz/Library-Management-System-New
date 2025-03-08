import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/common/loader/Loader";

const BookList = ({ books, loader, heading }) => {
  const navigate = useNavigate();

  return (
    <div className="fade-in">
      <h1 className="text-lg mb-4">{heading}</h1>

      {loader ? (
        <Loader />
      ) : books && books.length > 0 ? (
        <div className="space-y-4">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-emerald-200/[0.5] rounded-sm shadow-md p-4 flex items-start hover:bg-emerald-100 transition"
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
                  className="text-lg font-semibold cursor-pointer hover:text-emerald-600"
                  onClick={() =>
                    navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                      state: { bookId: book._id },
                    })
                  }
                >
                  {book.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  <strong>Borrowed:</strong>{" "}
                  {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                </p>
                <p className="text-red-500 text-sm">
                  <strong>Due:</strong>{" "}
                  {new Date(book.dueDate).toLocaleDateString("en-GB")}
                </p>
                <p
                  className={`text-sm font-semibold mt-2 ${
                    book.status === "pending"
                      ? "text-yellow-600" // 🟡 Pending
                      : book.status === "borrowed"
                      ? "text-blue-600" // 🔵 Borrowed
                      : book.status === "returned"
                      ? "text-green-600" // 🟢 Returned
                      : "text-red-600" // 🔴 Overdue
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
        <p className="text-center text-gray-600 py-4">No books found</p>
      )}
    </div>
  );
};

export default BookList;
