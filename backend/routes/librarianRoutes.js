const express = require("express");
const {
  signIn,
  signUp,
  getLibrarians,
  deleteLibrarian,
  updateLibrarian,
  getLibrarianById,
  resetPassword,
} = require("../controllers/librarianController");

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/alllibrarians", getLibrarians);
router.put("/librarian/:id", updateLibrarian);
router.delete("/librarian/:id", deleteLibrarian);
router.get("/librarian/:id", getLibrarianById);
router.post("/resetpassword", resetPassword);

module.exports = router;
