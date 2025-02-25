const express = require("express");
const {
  getOverdueBook,
  getUserUnreturnedBooks,
} = require("../controllers/activityController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/fine", protect, getOverdueBook);
router.post("/unreturned", protect, getUserUnreturnedBooks);

module.exports = router;
