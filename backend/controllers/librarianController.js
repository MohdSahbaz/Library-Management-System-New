const Librarian = require("../models/Librarian");
const bcrypt = require("bcryptjs");
const Otp = require("../models/Otp");
const generateToken = require("../utils/generateToken");
const matchPassword = require("../utils/matchPassword");

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const librarian = await Librarian.findOne({ email });
    if (!librarian) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPassowrdValid = await matchPassword(password, librarian.password);

    if (!isPassowrdValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(librarian),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const signUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, otp } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !phoneNumber || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if librarian already exists
    const existingLibrarian = await Librarian.findOne({ email });
    if (existingLibrarian) {
      return res.status(400).json({ message: "Librarian already exists" });
    }

    const otpUser = await Otp.findOne({ email });
    if (!otpUser || otpUser.otp !== otp) {
      return res.status(400).json({
        message: "OTP has expired or is invalid.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new librarian
    const newLibrarian = new Librarian({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    // Save the librarian in the database
    await newLibrarian.save();

    // Delete the OTP entry after successful register
    await Otp.deleteMany({ email });

    res.status(201).json({ message: "Librarian registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const getLibrarians = async (req, res) => {
  try {
    const users = await Librarian.find().select(
      "_id name imageUrl phoneNumber dateOfJoin"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteLibrarian = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the librarian exists
    const librarian = await Librarian.findById(id);
    if (!librarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }

    // Delete the librarian
    await Librarian.findByIdAndDelete(id);

    res.status(200).json({ message: "Librarian deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { signIn, signUp, getLibrarians, deleteLibrarian };
