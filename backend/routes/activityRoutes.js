const express = require("express");
const {
  getUserOverdueBooks,
  getUserBorroedBooks,
  getUserHistoryBooks,
  getUserBorroedBooksForLibrarian,
  getUserOverdueBooksForLibrarian,
  getUserHistoryBooksForLibrarian,
} = require("../controllers/activityController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// client routes
router.post("/fine", protect, getUserOverdueBooks);
router.post("/borrowed", protect, getUserBorroedBooks);
router.post("/history", protect, getUserHistoryBooks);

//librarian routes

router.post("/get-user-fine", protect, getUserOverdueBooksForLibrarian);
router.post("/get-user-borrowed", protect, getUserBorroedBooksForLibrarian);
router.post("/get-user-history", protect, getUserHistoryBooksForLibrarian);

module.exports = router;
