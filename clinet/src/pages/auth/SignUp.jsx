import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data", formData);
    setOtpSent(true); // Simulate OTP sent
  };

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    console.log("Entered OTP:", otp);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return !otpSent ? (
    <form onSubmit={handleSubmit} className="space-y-4 slide-in-right">
      <div>
        <h1 className="text-center mb-6">Create an account to get started</h1>
        <label className="block text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
          placeholder="Create a password"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
          placeholder="Enter your phone number"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-emerald-900 text-emerald-50 rounded-md hover:bg-emerald-800 transition duration-300"
      >
        Register
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  ) : (
    // OTP Form
    <form onSubmit={handleOTPSubmit} className="space-y-4 slide-in-bottom">
      <label className="block text-sm font-medium text-gray-700">OTP</label>
      <input
        type="text"
        name="otp"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
        placeholder="Enter OTP"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-emerald-900 text-emerald-50 rounded-md hover:bg-emerald-800 transition duration-300"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default SignUp;
