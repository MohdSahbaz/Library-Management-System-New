const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail
    pass: process.env.EMAIL_PASSWORD, // App password from Google
  },
});

module.exports = transporter;
