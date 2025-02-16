const express = require("express");
const {
  getLatestBooks,
  recommendateBooks,
  getMostReadBook,
  getSearchBook,
} = require("../controllers/booksController");

const router = express.Router();
router.get("/latest", getLatestBooks);
router.get("/recommend", recommendateBooks);
router.get("/mostreadbooks", getMostReadBook);
router.post("/search", getSearchBook);

module.exports = router;
