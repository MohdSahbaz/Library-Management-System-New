const Books = require("../models/Books");

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

const getSearchBook = async (req, res) => {};

module.exports = { getLatestBooks, recommendateBooks, getMostReadBook };
