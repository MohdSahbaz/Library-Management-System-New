const Books = require("../models/Books");
const Borrow = require("../models/Borrow");
const User = require("../models/User");
const Librarian = require("../models/Librarian");

const getDashboardDetail = async (req, res) => {
  try {
    const totalBooks = await Books.countDocuments();
    const totalPending = await Borrow.countDocuments({ status: "pending" });
    const totalBorrowed = await Borrow.countDocuments({ status: "borrowed" });
    const totalOverdue = await Borrow.countDocuments({ status: "overdue" });
    const totalUsers = await User.countDocuments();
    const totalUnverifiedUsers = await User.countDocuments({
      status: "unverified",
    });
    const totalLibrarians = await Librarian.countDocuments();

    res.status(200).json({
      totalBooks,
      totalPending,
      totalBorrowed,
      totalOverdue,
      totalUsers,
      totalLibrarians,
      totalUnverifiedUsers,
    });
  } catch (error) {
    console.error("Error fetching dashboard details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getDashboardDetail };
