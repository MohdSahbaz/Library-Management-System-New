const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const booksRouter = require("./routes/booksRoutes");
const userRouter = require("./routes/userRoute");
const otpRouter = require("./routes/otpRoute");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey");
});

// Routes
app.use("/api/books", booksRouter);
app.use("/api/user", userRouter);
app.use("/api/otp", otpRouter);

// Server setup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
