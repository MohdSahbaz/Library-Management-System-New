const Rating = require("../models/Rating");

// Add a rating
const addRating = async (req, res) => {
  try {
    const { bookId, rating } = req.body;
    const userId = req.user.id;

    // Check if the user has already rated this book
    const existingRating = await Rating.findOne({ bookId, userId });
    if (existingRating) {
      return res
        .status(400)
        .json({ message: "You have already rated this book" });
    }

    const newRating = new Rating({ bookId, userId, rating });
    await newRating.save();

    res.status(201).json({ message: "Rating added successfully", newRating });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get average rating for a book
const getAverageRating = async (req, res) => {
  try {
    const { bookId } = req.params;

    const ratings = await Rating.find({ bookId });

    const averageRating =
      ratings.reduce((sum, rating) => sum + rating.rating, 0) /
        ratings.length || 0;

    res.status(200).json({ averageRating: averageRating.toFixed(1) });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addRating, getAverageRating };
