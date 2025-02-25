const express = require("express");
const {
  getOverdueBook,
  getUserUnreturnedBooks,
  getHistory,
} = require("../controllers/activityController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/fine", protect, getOverdueBook);
router.post("/unreturned", protect, getUserUnreturnedBooks);
router.post("/history", protect, getHistory);

module.exports = router;
