const express = require("express");
const {
  signIn,
  signUp,
  getLibrarians,
  deleteLibrarian,
  addLibrarian,
  updateLibrarian,
  getLibrarianById,
} = require("../controllers/librarianController");

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/alllibrarians", getLibrarians);
router.post("/librarian", addLibrarian);
router.put("/librarian/:id", updateLibrarian);
router.delete("/librarian/:id", deleteLibrarian);
router.get("/librarian/:id", getLibrarianById);

module.exports = router;
