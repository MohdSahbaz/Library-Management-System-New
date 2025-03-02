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

  const [imageOption, setImageOption] = useState("url"); // Default to URL
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

    // If the user chooses file upload, send it to backend/cloud storage
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
        imageUrl = uploadResponse.data.imageUrl; // Assuming backend returns the uploaded image URL
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }
    }

    // Send book data with image URL
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
        <h1 className="text-xl font-semibold mb-4">Add Book Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload Option */}
          <div>
            <label className="font-semibold">Choose Image Upload Method:</label>
            <div className="flex gap-4 mt-2">
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

          {/* Image Input Based on Selection */}
          {imageOption === "url" ? (
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={book.imageUrl}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          )}

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={book.title}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={book.genre}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="number"
            name="copiesAvailable"
            placeholder="Copies Available"
            value={book.copiesAvailable}
            onChange={handleChange}
            min="1"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
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
