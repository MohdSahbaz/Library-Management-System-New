import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../components/animations/animations.css";
import Header from "../../components/common/Header";

const librarianApiUrl = import.meta.env.VITE_API_URL_LIBRARIAN;

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
      const response = await axios.post(`${librarianApiUrl}/signin`, formData);

      const { token } = response.data;
      localStorage.setItem("librarianToken", token); // Store token
      console.log(token);

      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setError(
        error?.response?.data?.message || "Oops! Incorrect email or password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Header pageName={"Sign In"} />
      <form
        onSubmit={handleSubmit}
        className="fade-in flex justify-center bg-black min-h-screen"
      >
        <div className="max-w-md w-full m-5 space-y-4">
          <div>
            <div className="bg-black text-center py-2 text-white font-semibold text-xl mb-4">
              <h1>LMS Librarian</h1>
            </div>
            <h1 className="text-lg font-semibold text-white">
              Welcome, Chief Librarian!
            </h1>
            <p className="text-sm text-gray-400">
              Sign in to manage your library and keep things running smoothly.
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-transparent border-gray-700 placeholder-gray-500 text-white"
              placeholder="Enter your secure password"
              required
            />
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
            ) : (
              "Access the Library"
            )}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </form>
    </>
  );
};

export default SignIn;
