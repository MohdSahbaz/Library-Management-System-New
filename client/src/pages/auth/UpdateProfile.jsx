import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const userApiUrl = import.meta.env.VITE_API_URL_USER;
const otpApiUrl = import.meta.env.VITE_API_URL_OTP;

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    otp: "",
  });

  const [error, setError] = useState(null);
  const [otpError, setOtpError] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [canSendOtp, setCanSendOtp] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async () => {
    if (!canSendOtp) return;

    setError(null);
    setIsSendingOtp(true);
    setCanSendOtp(false);
    setTimeLeft(120); // 2 minutes countdown

    try {
      const response = await axios.post(`${otpApiUrl}/sendupdateotp`, {
        email: formData.email,
      });
      setOtpError(response?.data?.message);
      setShowOtpInput(true);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      setOtpError(errorMessage);
      setCanSendOtp(true); // Allow retry if error occurs
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

  const token = localStorage.getItem("token"); // ✅ Retrieve token

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${userApiUrl}/update-profile`,
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/profile");
      alert(response.data.message);
    } catch (error) {
      setError(error?.response?.data?.message || "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="flex items-center justify-center bg-emerald-50 py-5 px-2">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 slide-in-right bg-emerald-200/[0.5] px-10 py-5 rounded-sm"
      >
        <h1 className="text-center mb-6">Update Your Account Details</h1>

        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
              placeholder="Enter your email"
              required
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={!canSendOtp}
              className={`px-4 py-2 bg-emerald-900 text-emerald-50 rounded-sm transition duration-300 flex items-center justify-center ${
                !canSendOtp
                  ? "bg-emerald-700 cursor-not-allowed"
                  : "hover:bg-emerald-800"
              }`}
            >
              {isSendingOtp ? (
                <span className="animate-spin border-2 border-t-transparent border-white rounded-full h-5 w-5"></span>
              ) : timeLeft > 0 ? (
                `Retry in ${timeLeft}s`
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
          <p className="text-red-500">{otpError}</p>
        </div>

        {showOtpInput && (
          <div>
            <label className="block text-sm font-medium">Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
              placeholder="Enter OTP"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
            placeholder="Create a password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
            placeholder="Enter your city"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-emerald-50 rounded-sm flex items-center justify-center transition duration-300 ${
            isSubmitting
              ? "bg-emerald-700 cursor-not-allowed"
              : "bg-emerald-900 hover:bg-emerald-800"
          }`}
        >
          {isSubmitting ? (
            <span className="animate-spin border-2 border-t-transparent border-white rounded-full h-5 w-5"></span>
          ) : (
            "Update"
          )}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile;
