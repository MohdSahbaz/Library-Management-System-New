import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/common/Header";

const bookApiUrl = import.meta.env.VITE_API_URL_BOOK;

const UpdateBook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookId = location.state?.bookId || "";

  const [book, setBook] = useState({
    imageUrl: "",
    title: "",
    author: "",
    description: "",
    genre: "",
    copiesAvailable: 1,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!bookId) {
      alert("Invalid book ID");
      navigate("/books");
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${bookApiUrl}/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
        alert("Failed to fetch book details.");
        navigate("/books");
      }
    };

    fetchBookDetails();
  }, [bookId, navigate]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${bookApiUrl}/update-book/${bookId}`, book);
      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pageName="Update Book" />
      <div className="md:px-6 m-2 p-2 py-4 max-w-lg mx-auto bg-gray-950/[0.5] rounded-sm shadow-md">
        <h1 className="text-xl font-semibold text-gray-200 mb-4">
          Update Book Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 font-semibold">
              Image URL:
            </label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={book.imageUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={book.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">Author:</label>
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={book.author}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">
              Description:
            </label>
            <textarea
              name="description"
              placeholder="Description"
              value={book.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">Genre:</label>
            <input
              type="text"
              name="genre"
              placeholder="Genre"
              value={book.genre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold">
              Copies Available:
            </label>
            <input
              type="number"
              name="copiesAvailable"
              placeholder="Copies Available"
              value={book.copiesAvailable}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm"
            />
          </div>

          <button
            type="submit"
            className={`bg-gray-700 text-white px-4 py-2 rounded-sm ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-600 w-full"
            } transition`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Book"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateBook;
