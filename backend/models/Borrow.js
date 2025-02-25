const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date, // Date when the book was actually returned
    },
    dueDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from borrow date
    },
    status: {
      type: String,
      enum: ["pending", "borrowed", "returned", "overdue"],
      default: "pending",
    },
    fine: {
      type: Number,
      default: 0, // Fine starts at 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrowSchema);
