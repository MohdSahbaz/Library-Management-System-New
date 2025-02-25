const express = require("express");
const { getOverdueBook } = require("../controllers/overdueController");
const router = express.Router();

router.post("/fine", getOverdueBook);

module.exports = router;
