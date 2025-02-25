const express = require("express");
const {
  getUserOverdueBooks,
  getUserBorroedBooks,
  getUserHistoryBooks,
} = require("../controllers/activityController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/fine", protect, getUserOverdueBooks);
router.post("/borrowed", protect, getUserBorroedBooks);
router.post("/history", protect, getUserHistoryBooks);

module.exports = router;
