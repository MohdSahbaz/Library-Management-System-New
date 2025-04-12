const Borrow = require("../models/Borrow");

const getUserOverdueBooks = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch all overdue books and populate full book details
    const overdueRecords = await Borrow.find({
      userId,
      status: "overdue",
    })
      .populate("bookId")
      .populate("userId", "name email _id");

    // Merge book details directly into overdueBooks array
    const overdueBooks = overdueRecords.map((record) => ({
      _id: record.bookId._id,
      record_id: record._id,
      title: record.bookId.title,
      author: record.bookId.author,
      genre: record.bookId.genre,
      imageUrl: record.bookId.imageUrl,
      salesCount: record.bookId.salesCount,
      borrowDate: record.borrowDate,
      returnDate: record.returnDate,
      dueDate: record.dueDate,
      status: record.status,
      fine: record.fine,
      userName: record.userId.name,
      userEmail: record.userId.email,
      userAddress: "India",
      userId: record.userId._id,
    }));

    // Calculate total fine
    const totalFine = overdueBooks.reduce((sum, book) => sum + book.fine, 0);

    res.status(200).json({ userId, overdueBooks, totalFine });
  } catch (error) {
    res.status(500).json({ message: "Error fetching overdue books", error });
  }
};

const getUserOverdueBooksForLibrarian = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch all overdue books and populate full book details
    const overdueRecords = await Borrow.find({
      userId,
      status: "overdue",
    }).populate("bookId");

    // Merge book details directly into overdueBooks array
    const overdueBooks = overdueRecords.map((record) => ({
      _id: record.bookId._id,
      record_id: record._id,
      title: record.bookId.title,
      author: record.bookId.author,
      genre: record.bookId.genre,
      imageUrl: record.bookId.imageUrl,
      salesCount: record.bookId.salesCount,
      borrowDate: record.borrowDate,
      returnDate: record.returnDate,
      dueDate: record.dueDate,
      status: record.status,
      fine: record.fine,
    }));

    // Calculate total fine
    const totalFine = overdueBooks.reduce((sum, book) => sum + book.fine, 0);

    res.status(200).json({ userId, overdueBooks, totalFine });
  } catch (error) {
    res.status(500).json({ message: "Error fetching overdue books", error });
    console.log(error);
  }
};

const getUserBorroedBooks = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from request

    // Find unreturned books for this user
    const unreturnedBooks = await Borrow.find({
      userId: userId, // Filter by user
      status: { $in: ["pending", "borrowed", "overdue"] }, // Only pending or unreturned
    })
      .populate("bookId", "title imageUrl _id") // Get book title & imageUrl
      .select("borrowDate dueDate status bookId") // Select required fields
      .lean();

    // Format response
    const formattedBooks = unreturnedBooks.map((book) => ({
      _id: book.bookId._id,
      title: book.bookId.title,
      imageUrl: book.bookId.imageUrl,
      borrowDate: book.borrowDate,
      dueDate: book.dueDate,
      status: book.status,
    }));

    res.status(200).json(formattedBooks);
  } catch (error) {
    console.error("Error fetching unreturned books:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserBorroedBooksForLibrarian = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find unreturned books for this user
    const unreturnedBooks = await Borrow.find({
      userId: userId, // Filter by user
      status: { $in: ["pending", "borrowed", "overdue"] }, // Only pending or unreturned
    })
      .populate("bookId", "title imageUrl _id") // Get book title & imageUrl
      .select("borrowDate dueDate status bookId") // Select required fields
      .lean();

    // Format response
    const formattedBooks = unreturnedBooks.map((book) => ({
      _id: book.bookId._id,
      title: book.bookId.title,
      imageUrl: book.bookId.imageUrl,
      borrowDate: book.borrowDate,
      dueDate: book.dueDate,
      status: book.status,
    }));

    res.status(200).json(formattedBooks);
  } catch (error) {
    console.error("Error fetching unreturned books:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserHistoryBooks = async (req, res) => {
  try {
    // Get the authenticated user's id
    const userId = req.user.id;

    // Find all borrow records for the user
    const historyRecords = await Borrow.find({ userId })
      .populate("bookId", "title imageUrl _id") // populate only the title and imageUrl of the book
      .select("borrowDate dueDate returnDate status bookId")
      .lean();

    // Format the records to match the unreturned response format
    const formattedHistory = historyRecords.map((record) => ({
      _id: record.bookId._id,
      title: record.bookId.title,
      imageUrl: record.bookId.imageUrl,
      borrowDate: record.borrowDate,
      dueDate: record.dueDate,
      returnDate: record.returnDate,
      status: record.status,
    }));

    res.status(200).json(formattedHistory);
  } catch (error) {
    console.error("Error fetching borrow history:", error);
    res.status(500).json({ message: "Error fetching borrow history", error });
  }
};

const getUserHistoryBooksForLibrarian = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find all borrow records for the user
    const historyRecords = await Borrow.find({ userId })
      .populate("bookId", "title imageUrl _id") // populate only the title and imageUrl of the book
      .select("borrowDate dueDate returnDate status bookId")
      .lean();

    // Format the records to match the unreturned response format
    const formattedHistory = historyRecords.map((record) => ({
      _id: record.bookId._id,
      title: record.bookId.title,
      imageUrl: record.bookId.imageUrl,
      borrowDate: record.borrowDate,
      dueDate: record.dueDate,
      returnDate: record.returnDate,
      status: record.status,
    }));

    res.status(200).json(formattedHistory);
  } catch (error) {
    console.error("Error fetching borrow history:", error);
    res.status(500).json({ message: "Error fetching borrow history", error });
  }
};

module.exports = {
  getUserOverdueBooks,
  getUserOverdueBooksForLibrarian,
  getUserBorroedBooks,
  getUserBorroedBooksForLibrarian,
  getUserHistoryBooks,
  getUserHistoryBooksForLibrarian,
};
