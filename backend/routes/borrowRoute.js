const express = require("express");
const {
  borrowBook,
  confirmBorrow,
  returnBook,
  getUserBorrowedBooks,
} = require("../controllers/borrowController");
const router = express.Router();

// 📌 User requests to borrow a book
router.post("/borrow", borrowBook);

// 📌 Librarian confirms borrow request
router.put("/confirm", confirmBorrow);

// 📌 User returns a borrowed book
router.put("/return", returnBook);

module.exports = router;
