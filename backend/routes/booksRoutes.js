const express = require("express");
const {
  getLatestBooks,
  recommendateBooks,
} = require("../controllers/booksController");

const router = express.Router();
router.get("/latest", getLatestBooks);
router.get("/recommend", recommendateBooks);

module.exports = router;
