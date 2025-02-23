const express = require("express");
const { sendOTP } = require("../controllers/otpController");
const router = express.Router();

router.post("/sendotp", sendOTP);

module.exports = router;
