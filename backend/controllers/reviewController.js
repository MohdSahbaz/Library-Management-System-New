const Review = require("../models/Review");

// Add a review (Max 5 per user per book)
const addReview = async (req, res) => {
  try {
    const { bookId, comment } = req.body;
    const userId = req.user.id;

    // Count the number of reviews the user has for this book
    const userReviewsCount = await Review.countDocuments({ bookId, userId });
    if (userReviewsCount >= 3) {
      return res
        .status(400)
        .json({ message: "You can only add up to 3 reviews per book." });
    }

    // Create a new review
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
