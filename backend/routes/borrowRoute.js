const express = require("express");
const {
  borrowBook,
  confirmBorrow,
  returnBook,
  getPendingBorrows,
  getBorrowedBooks,
  getOverdueBooks,
} = require("../controllers/borrowController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// 📌 User requests to borrow a book
router.post("/borrow", protect, borrowBook);

// 📌 Librarian confirms borrow request
router.put("/confirm", protect, confirmBorrow);

// 📌 User returns a borrowed book
router.put("/return", protect, returnBook);

// 📌 Get all pending borrow requests
router.get("/pending", protect, getPendingBorrows);

// 📌 Get all borrowed books
router.get("/borrowed", protect, getBorrowedBooks);

// 📌 Get all overdue books
router.get("/overdue", protect, getOverdueBooks);

module.exports = router;
