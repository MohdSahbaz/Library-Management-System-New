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

    // 🔹 Check if the user has already borrowed this specific book
    const existingBorrow = await Borrow.findOne({
      userId,
      bookId,
      status: { $in: ["pending", "borrowed"] }, // Pending or currently borrowed
    });

    if (existingBorrow) {
      return res.status(400).json({
        message:
          "You have already borrowed this book. Please return it before borrowing again.",
      });
    }

    // 🔹 Check if the book is available
    const book = await Books.findById(bookId);
    if (!book || book.copiesAvailable < 1) {
      return res
        .status(400)
        .json({ message: "Book not available for borrowing" });
    }

    // 🔹 Create a borrow request (Pending approval)
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

// 📌 Get All Pending Borrow Requests
const getPendingBorrows = async (req, res) => {
  try {
    const pendingBorrows = await Borrow.find({ status: "pending" })
      .populate("userId", "name")
      .populate("bookId", "title imageUrl")
      .select("_id userId bookId status borrowDate")
      .lean();

    const pendingBooks = pendingBorrows.map((books) => ({
      _id: books._id,
      userId: books.userId._id,
      userName: books.userId.name,
      bookId: books.bookId._id,
      title: books.bookId.title,
      imageUrl: books.bookId.imageUrl,
      status: books.status,
      borrowDate: books.borrowDate,
    }));

    res.status(200).json(pendingBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Get All Borrowed Books
const getBorrowedBooks = async (req, res) => {
  try {
    const pendingBorrows = await Borrow.find({ status: "borrowed" })
      .populate("userId", "name")
      .populate("bookId", "title imageUrl")
      .select("_id userId bookId status borrowDate dueDate")
      .lean();

    const borrowedBooks = pendingBorrows.map((books) => ({
      _id: books._id,
      userId: books.userId._id,
      userName: books.userId.name,
      bookId: books.bookId._id,
      title: books.bookId.title,
      imageUrl: books.bookId.imageUrl,
      status: books.status,
      borrowDate: books.borrowDate,
      dueDate: books.dueDate,
    }));

    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📌 Get All Overdue Books
const getOverdueBooks = async (req, res) => {
  try {
    const pendingBorrows = await Borrow.find({ status: "overdue" })
      .populate("userId", "name")
      .populate("bookId", "title imageUrl")
      .select("_id userId bookId status fine borrowDate dueDate")
      .lean();

    const borrowedBooks = pendingBorrows.map((books) => ({
      _id: books._id,
      userId: books.userId._id,
      userName: books.userId.name,
      bookId: books.bookId._id,
      title: books.bookId.title,
      imageUrl: books.bookId.imageUrl,
      status: books.status,
      fine: books.fine,
      borrowDate: books.borrowDate,
      dueDate: books.dueDate,
    }));

    res.status(200).json(borrowedBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const cancelBorrow = async (req, res) => {
  try {
    const { borrowId } = req.body;

    // Check if the borrow request exists
    const borrowRecord = await Borrow.findById(borrowId);
    if (!borrowRecord) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    // Only allow canceling if it's still "pending"
    if (borrowRecord.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending requests can be canceled" });
    }

    // Delete the borrow request
    await Borrow.findByIdAndDelete(borrowId);

    res.status(200).json({ message: "Borrow request canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const clearOverdue = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res
        .status(400)
        .json({ message: "User ID and Book ID are required" });
    }

    // Find the specific overdue borrow record
    const overdueRecord = await Borrow.findOne({
      userId,
      bookId,
      status: "overdue",
    });

    if (!overdueRecord) {
      return res
        .status(404)
        .json({ message: "No overdue record found for this book and user" });
    }

    // Update the borrow record: change status to "borrowed" and reset fine
    overdueRecord.status = "borrowed";
    overdueRecord.fine = 0;

    await overdueRecord.save();

    res
      .status(200)
      .json({ message: "Overdue book cleared successfully", overdueRecord });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  borrowBook,
  confirmBorrow,
  returnBook,
  getPendingBorrows,
  getBorrowedBooks,
  getOverdueBooks,
  cancelBorrow,
  clearOverdue,
};
