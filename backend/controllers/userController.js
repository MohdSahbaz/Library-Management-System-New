const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { verifyOTP } = require("./otpController");
const Otp = require("../models/Otp");

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

module.exports = signUp;

const signIn = async (req, res) => {
  res.send("Enter signIn Details");
};

module.exports = { signUp, signIn };
