const express = require("express");
const {
  sendOTP,
  sendUpdateOTP,
  sendLibrarianOTP,
  sendLibrarianPasswordOTP,
} = require("../controllers/otpController");
const router = express.Router();

router.post("/sendotp", sendOTP);
router.post("/sendupdateotp", sendUpdateOTP);
router.post("/sendlibrarianotp", sendLibrarianOTP);
router.post("/sendlibrarianpasswordotp", sendLibrarianPasswordOTP);

module.exports = router;
