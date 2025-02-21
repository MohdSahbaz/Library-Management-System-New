const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, city, imageUrl } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !phoneNumber || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
