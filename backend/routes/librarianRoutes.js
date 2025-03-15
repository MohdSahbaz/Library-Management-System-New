const express = require("express");
const {
  signIn,
  signUp,
  getLibrarians,
  deleteLibrarian,
} = require("../controllers/librarianController");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/alllibrarians", getLibrarians);
router.delete("/librarian/:id", deleteLibrarian);

module.exports = router;
