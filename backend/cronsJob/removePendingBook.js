const Borrow = require("../models/Borrow");

// 📌 Check and Remove Unconfirmed Requests After 2 Hours
const removeUnconfirmedBorrows = async () => {
  try {
    const now = new Date();
    const unconfirmedBorrows = await Borrow.find({
      status: "pending",
      expiresAt: { $lt: now },
    });

    for (const borrow of unconfirmedBorrows) {
      await Borrow.findByIdAndDelete(borrow._id);
    }

    console.log(
      `Removed ${unconfirmedBorrows.length} unconfirmed borrow requests.`
    );
  } catch (error) {
    console.error("Error removing unconfirmed borrows:", error.message);
  }
};

module.exports = removeUnconfirmedBorrows;
