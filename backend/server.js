const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
require("dotenv").config();

const connectDB = require("./config/db");

const booksRouter = require("./routes/booksRoutes");
const authRouter = require("./routes/authRoute");
const otpRouter = require("./routes/otpRoute");
const borrowRouter = require("./routes/borrowRoute");

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
app.use("/api/books", booksRouter);
app.use("/api/user", authRouter);
app.use("/api/otp", otpRouter);
app.use("/api/borrow", borrowRouter);

// Server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
