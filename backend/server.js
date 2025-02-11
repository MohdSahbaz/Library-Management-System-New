const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const booksRouter = require("./routes/booksRoutes");

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

// Server setup
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
