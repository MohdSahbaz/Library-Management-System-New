const Librarian = require("../models/Librarian");
const bcrypt = require("bcryptjs");
const Otp = require("../models/Otp");
const generateToken = require("../utils/generateToken");
const matchPassword = require("../utils/matchPassword");
const { countDocuments } = require("../models/User");

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

    const totalLibrarian = await Librarian.countDocuments();

    if (totalLibrarian === 1) {
      return res
        .status(400)
        .json({ message: "At least one librarian must remain." });
    }

    // Delete the librarian
    await Librarian.findByIdAndDelete(id);

    res.status(200).json({ message: "Librarian deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateLibrarian = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, password, otp } = req.body;

    const librarian = await Librarian.findById(id);
    if (!librarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }

    // Check if email is changing
    const isEmailChanging = email && email !== librarian.email;

    // Require OTP only if email is changing or password is being updated
    if (isEmailChanging || password) {
      if (!otp) {
        return res
          .status(400)
          .json({ message: "OTP is required for security verification" });
      }

      // Verify OTP
      const storedOtp = await Otp.findOne({ email: librarian.email, otp });
      if (!storedOtp) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Delete OTP after successful verification
      await Otp.deleteOne({ email: librarian.email });
    }

    // Apply updates
    librarian.name = name || librarian.name;
    librarian.phoneNumber = phoneNumber || librarian.phoneNumber;

    if (isEmailChanging) {
      librarian.email = email;
    }

    if (password) {
      librarian.password = await bcrypt.hash(password, 10);
    }

    await librarian.save();

    res
      .status(200)
      .json({ message: "Librarian updated successfully", librarian });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getLibrarianById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the librarian by ID
    const librarian = await Librarian.findById(id).select("-password");

    if (!librarian) {
      return res.status(404).json({ message: "Librarian not found" });
    }

    res.status(200).json(librarian);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
  getLibrarians,
  deleteLibrarian,
  updateLibrarian,
  getLibrarianById,
};
