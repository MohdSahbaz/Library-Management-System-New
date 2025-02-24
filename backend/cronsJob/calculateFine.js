const Borrow = require("../models/Borrow");

const DAILY_FINE_AMOUNT = 10; // Fine per day in currency units

const calculateFine = async () => {
  try {
    const now = new Date();

    // Find all overdue books that are not returned
    const overdueBorrows = await Borrow.find({
      status: "borrowed",
      dueDate: { $lt: now }, // Due date is in the past
    });

    for (const borrow of overdueBorrows) {
      // Calculate overdue days
      const overdueDays = Math.floor(
        (now - borrow.dueDate) / (1000 * 60 * 60 * 24)
      );

      if (overdueDays > 0) {
        borrow.status = "overdue"; // Mark as overdue
        borrow.fine = overdueDays * DAILY_FINE_AMOUNT; // Fine increases daily
        await borrow.save();
      }
    }

    console.log(`Updated fine for ${overdueBorrows.length} overdue books.`);
  } catch (error) {
    console.error("Error calculating fines:", error.message);
  }
};

module.exports = calculateFine;
