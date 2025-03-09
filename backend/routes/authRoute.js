const express = require("express");
const {
  signUp,
  signIn,
  profile,
  updateProfile,
  getUsers,
} = require("../controllers/userController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", protect, profile);
router.put("/update-profile", protect, updateProfile);
router.get("/allusers", protect, getUsers);

module.exports = router;
