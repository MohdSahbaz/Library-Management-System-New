const Books = require("../models/Books");
const Borrow = require("../models/Borrow");

// 📌 Borrow a Book (User Request)
const borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "User ID and Book ID are required" });
    }

    // Check if the book is available
    const book = await Books.findById(bookId);
    if (!book || book.copiesAvailable < 1) {
      return res
        .status(400)
        .json({ message: "Book not available for borrowing" });
    }

    // Create a borrow request (Pending approval)
    const borrowRecord = new Borrow({
      userId,
      bookId,
      status: "pending",
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // Auto-remove after 2 hours if not confirmed
    });

    await borrowRecord.save();
    res.status(201).json({
      message: "Borrow request created, waiting for confirmation",
      borrowRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Confirm Borrowing (Librarian Approval)
const confirmBorrow = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrowRecord = await Borrow.findById(borrowId);
    if (!borrowRecord) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    borrowRecord.status = "borrowed";
    borrowRecord.borrowDate = Date.now();
    borrowRecord.dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set due date to 1 week later
    borrowRecord.expiresAt = undefined; // Prevent auto-delete

    await borrowRecord.save();

    res.status(200).json({ message: "Borrow request confirmed", borrowRecord });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Return a Book
const returnBook = async (req, res) => {
  try {
    const { borrowId } = req.body;

    const borrowRecord = await Borrow.findById(borrowId);
    if (!borrowRecord) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    if (borrowRecord.status === "returned") {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrowRecord.status = "returned";
    borrowRecord.returnDate = Date.now();

    await borrowRecord.save();

    res.status(200).json({
      message: "Book returned successfully",
      fine: borrowRecord.fine,
      borrowRecord,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  borrowBook,
  confirmBorrow,
  returnBook,
};
