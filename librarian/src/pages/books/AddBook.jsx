import { useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";

const AddBook = () => {
  const [book, setBook] = useState({
    imageUrl: "",
    title: "",
    author: "",
    description: "",
    genre: "",
    copiesAvailable: 1,
  });

  const [imageOption, setImageOption] = useState("url");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = book.imageUrl;

    if (imageOption === "file" && imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadResponse = await axios.post(
          "http://localhost:8080/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        imageUrl = uploadResponse.data.imageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }
    }

    try {
      await axios.post("http://localhost:8080/api/book/add-book", {
        ...book,
        imageUrl,
      });

      alert("Book added successfully!");
      setBook({
        imageUrl: "",
        title: "",
        author: "",
        description: "",
        genre: "",
        copiesAvailable: 1,
      });
      setImageFile(null);
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
      <div className="md:px-6 p-2 py-4">
        <h1 className="text-xl font-semibold text-gray-200 mb-4">
          Add Book Details
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold text-gray-300">
              Choose Image Upload Method:
            </label>
            <div className="flex gap-4 mt-2 text-gray-400">
              <label>
                <input
                  type="radio"
                  name="imageOption"
                  value="url"
                  checked={imageOption === "url"}
                  onChange={() => setImageOption("url")}
                />{" "}
                Use Image URL
              </label>
              <label>
                <input
                  type="radio"
                  name="imageOption"
                  value="file"
                  checked={imageOption === "file"}
                  onChange={() => setImageOption("file")}
                />{" "}
                Upload File
              </label>
            </div>
          </div>

          {imageOption === "url" ? (
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={book.imageUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded"
            />
          )}

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={book.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded"
          />
          <input
            type="number"
            name="copiesAvailable"
            placeholder="Copies Available"
            value={book.copiesAvailable}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border border-gray-700 bg-gray-800 text-gray-300 rounded"
          />
          <button
            type="submit"
            className={`bg-gray-700 text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-600"
            } transition`}
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
