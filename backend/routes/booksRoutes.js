const express = require("express");
const {
  getLatestBooks,
  recommendateBooks,
  getMostReadBook,
} = require("../controllers/booksController");

const router = express.Router();
router.get("/latest", getLatestBooks);
router.get("/recommend", recommendateBooks);
router.get("/mostreadbooks", getMostReadBook);

module.exports = router;
