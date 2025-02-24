const express = require("express");
const { addReview, getReviews } = require("../controllers/reviewController");
const { default: protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", protect, addReview); // Add a review (Authenticated users only)
router.get("/:bookId", getReviews); // Get all reviews for a book

module.exports = router;
