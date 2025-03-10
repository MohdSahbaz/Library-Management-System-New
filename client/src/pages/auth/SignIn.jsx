import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const userApiUrl = import.meta.env.VITE_API_URL_USER;

const SignIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${userApiUrl}/signin`, formData);

      const { token } = response.data;
      localStorage.setItem("token", token); // Store token

      navigate("/profile");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(error?.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 slide-in-left">
      <h1 className="text-center mb-6">
        Welcome back! Please enter your details
      </h1>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
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
          className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/[0.5] bg-transparent border-emerald-800 placeholder:text-emerald-800/[0.5]"
          placeholder="Enter your password"
          required
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
          "Sign In"
        )}
      </button>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>

      <p className="text-center mt-4">
        <Link to="/reset-password" className="text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
