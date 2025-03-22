import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../components/animations/animations.css";
import Header from "../../components/common/Header";

const otpApiUrl = import.meta.env.VITE_API_URL_OTP;
const librarianApiUrl = import.meta.env.VITE_API_URL_LIBRARIAN;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Enter Email, Step 2: Enter OTP & New Password
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await axios.post(`${otpApiUrl}/sendlibrarianpasswordotp`, {
        email: formData.email,
      });
      setStep(2); // Move to OTP verification step
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await axios.post(`${librarianApiUrl}/resetpassword`, formData);
      navigate("/signin"); // Redirect to sign-in after successful reset
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header pageName={"Reset Password"} />
      <form
        onSubmit={step === 1 ? handleSendOtp : handleResetPassword}
        className="fade-in flex justify-center bg-gray-800 min-h-screen md:pt-10"
      >
        <div className="max-w-md w-full m-5 space-y-4">
          <div>
            <div className="bg-black text-center py-2 text-white font-semibold text-xl mb-4">
              <h1>LMS Librarian</h1>
            </div>
            <h1 className="text-lg font-semibold text-white">
              {step === 1 ? "Forgot Password?" : "Verify OTP & Reset Password"}
            </h1>
            <p className="text-sm text-gray-400">
              {step === 1
                ? "Enter your email to receive an OTP."
                : "Enter the OTP sent to your email and set a new password."}
            </p>

            <label className="block text-sm font-medium text-gray-300 mt-4">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent border-gray-700 placeholder-gray-500 text-white"
              placeholder="Enter your email address"
              required
              disabled={step === 2}
            />

            {step === 2 && (
              <>
                <label className="block text-sm font-medium text-gray-300 mt-4">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent border-gray-700 placeholder-gray-500 text-white"
                  placeholder="Enter OTP"
                  required
                />

                <label className="block text-sm font-medium text-gray-300 mt-4">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent border-gray-700 placeholder-gray-500 text-white"
                  placeholder="Enter new password"
                  required
                />
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white rounded-sm flex items-center justify-center transition duration-300 ${
              isSubmitting
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {isSubmitting ? (
              <span className="animate-spin border-2 border-t-transparent border-white rounded-full h-5 w-5"></span>
            ) : step === 1 ? (
              "Send OTP"
            ) : (
              "Reset Password"
            )}
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
