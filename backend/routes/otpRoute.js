const express = require("express");
const { sendOTP, sendUpdateOTP } = require("../controllers/otpController");
const router = express.Router();

router.post("/sendotp", sendOTP);
router.post("/sendupdateotp", sendUpdateOTP);

module.exports = router;
