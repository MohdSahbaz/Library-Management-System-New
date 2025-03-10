const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Otp = require("../models/Otp");
const generateToken = require("../utils/generateToken");
const matchPassword = require("../utils/matchPassword");

const signUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, city, imageUrl, otp } =
      req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !phoneNumber || !city || !otp) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otpUser = await Otp.findOne({ email });
    if (!otpUser || otpUser.otp !== otp) {
      return res.status(400).json({
        message: "OTP has expired or is invalid.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      city,
      imageUrl: imageUrl || null,
    });

    // Save the user in the database
    await newUser.save();

    // Delete the OTP entry after successful register
    await Otp.deleteMany({ email });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPassowrdValid = await matchPassword(password, user.password);

    if (!isPassowrdValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      token: generateToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, city, imageUrl, otp } =
      req.body;
    const userId = req.user.id;

    // Check if OTP is provided
    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP validity
    const otpUser = await Otp.findOne({ email: user.email });
    if (!otpUser || otpUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (city) user.city = city;
    if (imageUrl) user.imageUrl = imageUrl;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Save updated user
    await user.save();

    // Delete OTP entry
    await Otp.deleteMany({ email: user.email });

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id name imageUrl phoneNumber city"
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    // Validate request body
    if (!email || !password || !otp) {
      return res
        .status(400)
        .json({ message: "Email, OTP, and new password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save updated user password
    await user.save();

    // Delete OTP entry
    await Otp.deleteMany({ email });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
  profile,
  updateProfile,
  getUsers,
  updatePassword,
};
