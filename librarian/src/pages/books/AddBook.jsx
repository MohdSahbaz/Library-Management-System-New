import { useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";

const bookApiUrl = import.meta.env.VITE_API_URL_BOOK;

const AddBook = () => {
  const [book, setBook] = useState({
    imageUrl: "",
    title: "",
    author: "",
    description: "",
    genre: "",
    copiesAvailable: 1,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${bookApiUrl}/add-book`, book);

      alert("Book added successfully!");
      setBook({
        imageUrl: "",
        title: "",
        author: "",
        description: "",
        genre: "",
        copiesAvailable: 1,
      });
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message || "Failed to add book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pageName="Add Book" />
      <div className="md:px-6 m-2 p-2 py-4 max-w-lg mx-auto bg-gray-950/[0.5] rounded-sm shadow-md">
        <h1 className="text-2xl font-semibold text-gray-200 mb-6 text-center">
          Add a New Book
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-gray-400 font-medium mb-1"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              placeholder="Enter image URL"
              value={book.imageUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-gray-400 font-medium mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter book title"
              value={book.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-gray-400 font-medium mb-1"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Enter author's name"
              value={book.author}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-400 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter book description"
              value={book.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="genre"
              className="block text-gray-400 font-medium mb-1"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              placeholder="Enter book genre"
              value={book.genre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div>
            <label
              htmlFor="copiesAvailable"
              className="block text-gray-400 font-medium mb-1"
            >
              Copies Available
            </label>
            <input
              type="number"
              id="copiesAvailable"
              name="copiesAvailable"
              placeholder="Enter number of copies"
              value={book.copiesAvailable}
              onChange={handleChange}
              min="1"
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3 font-medium text-white bg-gray-700 rounded-sm transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBook;
