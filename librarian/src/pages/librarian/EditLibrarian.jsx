import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../../components/common/Header";

const librarianApiUrl = import.meta.env.VITE_API_URL_LIBRARIAN;
const otpApiUrl = import.meta.env.VITE_API_URL_OTP;

const EditLibrarian = () => {
  const location = useLocation();
  const { librarianId } = location.state;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [canSendOtp, setCanSendOtp] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const fetchLibrarian = async () => {
      try {
        const response = await axios.get(
          `${librarianApiUrl}/librarian/${librarianId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching librarian:", error);
      }
    };
    fetchLibrarian();
  }, [librarianId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!canSendOtp) return;

    setOtpError(null);
    setIsSendingOtp(true);
    setCanSendOtp(false);

    try {
      const response = await axios.post(`${otpApiUrl}/send-update-otp`, {
        email: formData.email,
      });
      setOtpError(response?.data?.message);
      setShowOtpInput(true);
      setTimeLeft(120);
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = { ...formData };
      if (showOtpInput) {
        payload.otp = otp;
      }

      const response = await axios.put(
        `${librarianApiUrl}/${librarianId}`,
        payload
      );

      setMessage(response.data.message || "Librarian updated successfully!");
    } catch (error) {
      setMessage("Error updating librarian.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header pageName={"Edit Librarian"} />
      <div className="flex justify-center items-center mt-5 bg-gray-900">
        <div className="bg-gray-800 p-6 rounded-sm shadow-lg w-full max-w-md">
          <h2 className="text-white text-2xl mb-4 text-center">
            Edit Librarian
          </h2>
          {message && (
            <p className="text-gray-400 text-center mb-4">{message}</p>
          )}
          <form onSubmit={handleUpdate} className="space-y-4">
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
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 bg-gray-700 text-white rounded-sm"
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
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-300 mb-1" htmlFor="password">
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 bg-gray-700 text-white rounded-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-sm"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Librarian"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditLibrarian;
