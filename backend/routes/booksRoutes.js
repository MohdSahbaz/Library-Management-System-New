const express = require("express");
const {
  getLatestBooks,
  recommendateBooks,
  getMostReadBook,
  getSearchBook,
  getBookById,
  getUserBorrowedBooks,
  deleteBook,
  addBook,
  updateBook,
} = require("../controllers/booksController");

const router = express.Router();

router.get("/latest", getLatestBooks);
router.get("/recommend", recommendateBooks);
router.get("/mostreadbooks", getMostReadBook);
router.post("/search", getSearchBook);
router.get("/book/:bookId", getBookById);
router.get("/user/:userId", getUserBorrowedBooks); // get user all borrowed book
router.delete("/delete-book/:bookId", deleteBook);
router.post("/add-book", addBook); // Add a new book
router.put("/update-book/:bookId", updateBook); // Update a book

module.exports = router;
