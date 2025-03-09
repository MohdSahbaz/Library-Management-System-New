const express = require("express");
const {
  signIn,
  signUp,
  getLibrarians,
} = require("../controllers/librarianController");
const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/alllibrarians", getLibrarians);

module.exports = router;
