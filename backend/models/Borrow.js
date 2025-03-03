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
      type: Date,
    },
    dueDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    status: {
      type: String,
      enum: ["pending", "borrowed", "returned", "overdue"],
      default: "pending",
    },
    fine: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      index: { expires: 0 }, // TTL index for automatic deletion
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Borrow", borrowSchema);
