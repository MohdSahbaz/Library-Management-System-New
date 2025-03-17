const express = require("express");
const {
  signUp,
  signIn,
  profile,
  updateProfile,
  getUsers,
  updatePassword,
  getUserProfileForLibrarian,
  deleteUser,
  searchUsers,
  verifyUser,
  getUnverifiedUsers,
} = require("../controllers/userController");
const { default: protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", protect, profile);
router.put("/update-profile", protect, updateProfile);
router.put("/reset-password", updatePassword);
router.get("/allusers", protect, getUsers);
router.get("/get-user", protect, getUserProfileForLibrarian);
router.delete("/delete-user/:userId", deleteUser);
router.get("/search", searchUsers);
router.get("/verifyuser", verifyUser);
router.get("/unverified", getUnverifiedUsers);

module.exports = router;
