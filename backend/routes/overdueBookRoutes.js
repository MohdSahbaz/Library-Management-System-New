const express = require("express");
const { getOverdueBook } = require("../controllers/overdueController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/fine", protect, getOverdueBook);

module.exports = router;
