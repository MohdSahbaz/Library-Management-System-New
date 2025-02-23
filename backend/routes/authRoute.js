const express = require("express");
const { signUp, signIn, profile } = require("../controllers/userController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", protect, profile);

module.exports = router;
