const express = require("express");
const {
  getLatestBooks,
  recommendateBooks,
  getMostReadBook,
  getSearchBook,
  getBookById,
} = require("../controllers/booksController");

const router = express.Router();
router.get("/latest", getLatestBooks);
router.get("/recommend", recommendateBooks);
router.get("/mostreadbooks", getMostReadBook);
router.post("/search", getSearchBook);
router.get("/book/:bookId", getBookById);

module.exports = router;
