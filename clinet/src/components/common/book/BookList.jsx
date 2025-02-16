import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

const BookList = ({ books, loader }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-emerald-50 px-6 py-4">
      <h1 className="text-lg mb-4">Most Read Books</h1>

      {loader ? (
        <Loader />
      ) : (
        <table className="w-full text-left text-sm">
          {books && books.length > 0 && (
            <thead>
              <tr className="bg-emerald-100 border-b shadow-md">
                <th className="pl-4 py-2">Title</th>
                <th className="pl-4 py-2">Genre</th>
                <th className="pl-4 py-2 hidden md:table-cell">Readers</th>
              </tr>
            </thead>
          )}
          <tbody>
            {books && books.length > 0 ? (
              books.map((book, index) => (
                <tr
                  onClick={() =>
                    navigate(`/book/${book.title.replace(/\s+/g, "-")}`)
                  }
                  key={book.id}
                  className={`${
                    index % 2 === 0 ? "bg-emerald-100/[0.5]" : "bg-emerald-50"
                  } hover:bg-emerald-200/[0.5] transition-colors cursor-pointer border-b shadow-md group`}
                >
                  <td className="pl-4 py-3 flex items-center">
                    <img
                      src={book.imageUrl}
                      alt={book.title}
                      className="w-12 h-18 object-cover rounded-sm group-hover:scale-150 transition-all duration-300 ease-out"
                    />
                    <div className="pl-4">
                      <h2 className="text-md font-semibold">{book.title}</h2>
                      <p className="text-gray-500">{book.author}</p>
                    </div>
                  </td>
                  <td className="pl-4 py-3">{book.genre || "Unknown Genre"}</td>
                  <td className="pl-4 py-3 hidden md:table-cell text-gray-500">
                    {book.salesCount || "Unknown"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-600">
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
