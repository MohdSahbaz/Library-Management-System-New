const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    genre: {
      type: String,
    },
    copiesAvailable: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", booksSchema);
module.exports = Book;
