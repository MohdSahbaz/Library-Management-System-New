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
router.delete("/delete-user/:userId", protect, deleteUser);
router.get("/search", searchUsers);

module.exports = router;
