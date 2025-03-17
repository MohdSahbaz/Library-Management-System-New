const express = require("express");
const { sendOTP, sendUpdateOTP, sendLibrarianOTP } = require("../controllers/otpController");
const router = express.Router();

router.post("/sendotp", sendOTP);
router.post("/sendupdateotp", sendUpdateOTP);
router.post("/sendlibrarianotp", sendLibrarianOTP);

module.exports = router;
