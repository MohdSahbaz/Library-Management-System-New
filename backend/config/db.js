const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/libraryDB");
    console.log("Database connected");
  } catch (error) {
    console.log("Error while connection to db:", error.message);
  }
};

module.exports = connectDB;
