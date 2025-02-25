import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const BookList = ({ books, loader, heading }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-emerald-50 py-4 fade-in px-2 md:px-6">
      <h1 className="text-lg md:text-xl font-semibold mb-4">{heading}</h1>

      {loader ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="hidden md:table w-full text-left text-sm">
            {books && books.length > 0 && (
              <thead>
                <tr className="bg-emerald-100 border-b shadow-md">
                  <th className="pl-4 py-2">Title</th>
                  <th className="pl-4 py-2">Borrow Date</th>
                  <th className="pl-4 py-2">Due Date</th>
                  <th className="pl-4 py-2">Fine</th>
                  <th className="pl-4 py-2 text-center">Action</th>
                </tr>
              </thead>
            )}
            <tbody>
              {books && books.length > 0 ? (
                books.map((book, index) => (
                  <tr
                    key={book._id}
                    className={`${
                      index % 2 === 0 ? "bg-emerald-100/[0.5]" : "bg-emerald-50"
                    } hover:bg-emerald-200/[0.5] transition-colors border-b shadow-md`}
                  >
                    {/* Title + Image */}
                    <td
                      className="pl-4 py-3 flex items-center cursor-pointer"
                      onClick={() =>
                        navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                          state: { bookId: book._id },
                        })
                      }
                    >
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded-sm shadow-md mr-3"
                      />
                      <div>
                        <h2 className="text-md font-semibold">{book.title}</h2>
                        <p className="text-gray-500">{book.author}</p>
                      </div>
                    </td>

                    {/* Borrow Date */}
                    <td className="pl-4 py-3">
                      {new Date(book.borrowDate).toLocaleDateString()}
                    </td>

                    {/* Due Date */}
                    <td className="pl-4 py-3 text-red-500">
                      {new Date(book.dueDate).toLocaleDateString()}
                    </td>

                    {/* Fine */}
                    <td className="pl-4 py-3 text-gray-700 font-semibold">
                      ₹{book.fine || 0}
                    </td>

                    {/* Action: Pay Fine Button */}
                    <td className="pl-4 py-3 pr-2 text-center">
                      {book.fine > 0 ? (
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-sm hover:bg-red-600 transition"
                          onClick={() => alert(`Pay fine for ${book.title}`)}
                        >
                          Pay Fine
                        </button>
                      ) : (
                        <span className="text-gray-400">No Fine</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-600">
                    No overdue books
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Mobile View - Card Layout */}
          <div className="md:hidden">
            {books && books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book._id}
                  className="bg-white p-4 mb-3 rounded-lg shadow-md"
                >
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() =>
                      navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                        state: { bookId: book._id },
                      })
                    }
                  >
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-md shadow-md mr-4"
                    />
                    <div>
                      <h2 className="text-md font-semibold">{book.title}</h2>
                      <p className="text-gray-500">{book.author}</p>
                    </div>
                  </div>

                  <div className="mt-2 text-sm">
                    <p>
                      <strong>Borrowed:</strong>{" "}
                      {new Date(book.borrowDate).toLocaleDateString()}
                    </p>
                    <p className="text-red-500">
                      <strong>Due:</strong>{" "}
                      {new Date(book.dueDate).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Fine:</strong> ₹{book.fine || 0}
                    </p>
                  </div>

                  {/* Pay Fine Button */}
                  {book.fine > 0 && (
                    <button
                      className="w-full bg-red-500 text-white py-2 rounded-md mt-3 hover:bg-red-600 transition"
                      onClick={() => alert(`Pay fine for ${book.title}`)}
                    >
                      Pay Fine
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No overdue books</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
