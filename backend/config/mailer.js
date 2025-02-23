const transporter = require("../config/nodemailerConfig"); // ✅ Correct Import

const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      // ✅ Now this will work
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendMail;
