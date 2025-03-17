import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/common/Header";

const librarianApiUrl = import.meta.env.VITE_API_URL_LIBRARIAN;
const otpApiUrl = import.meta.env.VITE_API_URL_OTP;

const AddLibrarian = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [canSendOtp, setCanSendOtp] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!canSendOtp) return;

    setOtpError(null);
    setIsSendingOtp(true);
    setCanSendOtp(false);

    try {
      const response = await axios.post(`${otpApiUrl}/sendlibrarianotp`, {
        email: formData.email,
      });
      setOtpError(response?.data?.message);
      setShowOtpInput(true);
      setTimeLeft(120); // 2-minute countdown
    } catch (error) {
      setOtpError(error.response?.data?.message || "Failed to send OTP.");
      setCanSendOtp(true);
    } finally {
      setIsSendingOtp(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanSendOtp(true);
    }
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`${librarianApiUrl}/signup`, formData);

      alert("Librarian added successfully!");
      navigate("/librarian");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add librarian");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pageName={"Add Librarian"} />
      <div className="flex justify-center items-center mt-4 bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-sm shadow-lg w-full max-w-md">
          <h2 className="text-white text-2xl mb-4 text-center">
            Add Librarian
          </h2>
          {message && (
            <p className="text-gray-400 text-center mb-4">{message}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-300 mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-sm"
                required
              />
            </div>

            {/* Email & OTP Button */}
            <div>
              <label className="block text-gray-300 mb-1" htmlFor="email">
                Email
              </label>
              <div className="flex gap-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 text-white rounded-sm"
                  required
                />
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!canSendOtp}
                  className={`px-4 py-2 bg-gray-600 text-white rounded-sm transition duration-300 ${
                    !canSendOtp
                      ? "bg-gray-500 cursor-not-allowed"
                      : "hover:bg-gray-500"
                  }`}
                >
                  {isSendingOtp
                    ? "Sending..."
                    : timeLeft > 0
                    ? `Retry in ${timeLeft}s`
                    : "Send OTP"}
                </button>
              </div>
              {otpError && <p className="text-red-500">{otpError}</p>}
            </div>

            {/* OTP Input */}
            {showOtpInput && (
              <div>
                <label className="block text-gray-300 mb-1" htmlFor="otp">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full p-2 bg-gray-700 text-white rounded-sm"
                  required
                />
              </div>
            )}

            {/* Phone Number */}
            <div>
              <label className="block text-gray-300 mb-1" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-sm"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-sm"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Librarian"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddLibrarian;
