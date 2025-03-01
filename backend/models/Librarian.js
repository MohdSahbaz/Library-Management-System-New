const mongoose = require("mongoose");

const librarianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dateOfJoin: {
    type: Date,
    default: Date.now,
  },
});

const Librarian = mongoose.model("Librarian", librarianSchema);
module.exports = Librarian;
