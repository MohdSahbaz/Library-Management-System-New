const express = require("express");
const {
  addRating,
  getAverageRating,
} = require("../controllers/ratingController");
const { default: protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/add", protect, addRating);
router.get("/average/:bookId", getAverageRating);

module.exports = router;
