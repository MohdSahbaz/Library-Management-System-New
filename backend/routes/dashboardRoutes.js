const express = require("express");
const { getDashboardDetail } = require("../controllers/dashboardController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/total", protect, getDashboardDetail);

module.exports = router;
