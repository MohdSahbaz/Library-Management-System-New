const Review = require("../models/Review");

// Add a review
const addReview = async (req, res) => {
  try {
    const { bookId, comment } = req.body;
    const userId = req.user.id;

    const newReview = new Review({ bookId, userId, comment });
    await newReview.save();

    res.status(201).json({ message: "Review added successfully", newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all reviews for a book
const getReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId }).populate("userId", "name");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addReview, getReviews };
