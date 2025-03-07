import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const BookList = ({ books, loader, heading }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 py-4 fade-in px-2">
      <h1 className="text-lg mb-4 text-gray-100">{heading}</h1>

      {loader ? (
        <Loader />
      ) : (
        <table className="w-full text-left text-sm">
          {books && books.length > 0 && (
            <thead>
              <tr className="bg-gray-800 border-b border-gray-700">
                <th className="pl-4 py-2 text-gray-300">Title</th>
                <th className="pl-4 py-2 hidden md:table-cell text-gray-300">
                  Available
                </th>
                <th className="pl-4 py-2 text-gray-300">Date</th>
              </tr>
            </thead>
          )}
          <tbody>
            {books && books.length > 0 ? (
              books.map((book, index) => (
                <tr
                  onClick={() =>
                    navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                      state: { bookId: book._id },
                    })
                  }
                  key={book._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                  } hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-700 group`}
                >
                  <td className="pl-4 py-3 flex items-center">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-12 h-18 object-cover rounded-sm group-hover:scale-110 transition-all duration-300 ease-out"
                    />
                    <div className="pl-4">
                      <h2 className="text-md font-semibold text-gray-200">
                        {book.title}
                      </h2>
                      <p className="text-gray-400">{book.author}</p>
                    </div>
                  </td>
                  <td className="pl-4 py-3 hidden md:table-cell text-gray-300">
                    {book.copiesAvailable || "Unknown Genre"}
                  </td>
                  <td className="pl-4 py-3 text-gray-400">
                    {new Date(book.createdAt).toLocaleDateString("en-GB") ||
                      "Unknown"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No books available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookList;
