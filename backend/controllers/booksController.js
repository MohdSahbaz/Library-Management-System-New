const Books = require("../models/Books");
const Borrow = require("../models/Borrow");

// Get latest books by creation date
const getLatestBooks = async (req, res) => {
  try {
    const latestBooks = await Books.find()
      .sort({ createdAt: -1 }) // Sort by most recently created
      .limit(12); // Limit to 12 latest books
    res.status(200).json(latestBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest books", error });
  }
};

// Recommend 10 random books
const recommendateBooks = async (req, res) => {
  try {
    const recommendedBooks = await Books.aggregate([
      { $sample: { size: 12 } }, // Randomly select 10 books
    ]);
    res.status(200).json(recommendedBooks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recommended books", error });
  }
};

const getMostReadBook = async (req, res) => {
  try {
    const mostReadBooks = await Books.find().sort({ salesCount: -1 }).limit(12);

    if (mostReadBooks.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(mostReadBooks); // Return the most sold book
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getSearchBook = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.body; // Get search query, page, and limit

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const pageNumber = parseInt(page, 10) || 1; // Convert page to number (default: 1)
    const limitNumber = parseInt(limit, 10) || 10; // Convert limit to number (default: 10)
    const skip = (pageNumber - 1) * limitNumber; // Calculate how many results to skip

    // Search books by title, genre, and author
    const books = await Books.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    })
      .skip(skip) // Skip previous pages' results
      .limit(limitNumber) // Limit results per page
      .exec();

    // Get total number of matched books (for pagination info)
    const totalBooks = await Books.countDocuments({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
      ],
    });

    // Send paginated response
    res.status(200).json({
      totalBooks, // Total matching books
      totalPages: Math.ceil(totalBooks / limitNumber), // Total pages
      currentPage: pageNumber, // Current page number
      books, // Books for this page
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params; // Get bookId

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const book = await Books.findById(bookId); // Find book by ID

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 📌 Get Borrowed Books for a User
const getUserBorrowedBooks = async (req, res) => {
  try {
    const { userId } = req.params;

    const borrowedBooks = await Borrow.find({ userId }).populate("bookId");

    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const book = await Books.findByIdAndDelete(bookId); // Find and delete the book

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getLatestBooks,
  recommendateBooks,
  getMostReadBook,
  getSearchBook,
  getBookById,
  getUserBorrowedBooks,
  deleteBook,
};
