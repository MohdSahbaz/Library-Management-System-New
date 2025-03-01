const User = require("../models/User");
const Otp = require("../models/Otp");
const generateOTP = require("../utils/generateOTP");
const sendMail = require("../config/mailer");
const {
  otpEmailTemplate,
  otpEmailTemplateForUpdate,
} = require("../utils/otpEmailTemplate");

const sendOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const existingOtp = await Otp.find({ email });
    if (existingOtp.length > 0) {
      await Otp.deleteMany({ email });
    }

    // Generate OTP
    const otpCode = generateOTP();

    // Save OTP in a separate collection
    await Otp.create({ email, otp: otpCode });

    // Send OTP via email
    const emailResponse = await sendMail(
      email,
      "Your OTP Code",
      otpEmailTemplate(otpCode)
    );

    if (!emailResponse.success) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP. Try again." });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const sendUpdateOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    // Remove any existing OTPs for this email
    await Otp.deleteMany({ email });

    // Generate a new OTP
    const otpCode = generateOTP();

    // Save OTP to the database
    await Otp.create({ email, otp: otpCode });

    // Send OTP via email
    const emailResponse = await sendMail(
      email,
      "Your OTP Code for Profile Update",
      otpEmailTemplateForUpdate(otpCode)
    );

    if (!emailResponse.success) {
      return res
        .status(500)
        .json({ message: "Failed to send OTP. Try again." });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};



module.exports = { sendOTP, sendUpdateOTP };
