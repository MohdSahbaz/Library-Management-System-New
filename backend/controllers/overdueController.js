const Borrow = require("../models/Borrow");

const getOverdueBook = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find overdue books for the specific user where status is "overdue"
    const overdueBooks = await Borrow.find({
      userId,
      status: "overdue",
    })
      .populate("bookId", "title author")
      .select("bookId dueDate fine");

    // Calculate total fine for the user
    const totalFine = overdueBooks.reduce((sum, book) => sum + book.fine, 0);

    // Send response
    res.status(200).json({ userId, overdueBooks, totalFine });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching overdue books", error: error.message });
  }
};

module.exports = { getOverdueBook };
