const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const connectDB = require("./config/db");

const booksRoutes = require("./routes/booksRoutes");
const authRoutes = require("./routes/authRoute");
const otpRoutes = require("./routes/otpRoute");
const borrowRoutes = require("./routes/borrowRoute");
const ratingRoutes = require("./routes/ratingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const overdueRoutes = require("./routes/activityRoutes");

const calculateFine = require("./cronsJob/calculateFine");
const removeUnconfirmedBorrows = require("./cronsJob/removePendingBook");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Run cleanup every 30 minutes to remove unconfirmed borrows
cron.schedule("*/30 * * * *", () => {
  console.log("Checking and removing unconfirmed borrow requests...");
  removeUnconfirmedBorrows();
});

// Run fine calculation every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running fine calculation...");
  calculateFine();
});

// Routes
app.use("/api/books", booksRoutes);
app.use("/api/user", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/activity", overdueRoutes);

// Server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
