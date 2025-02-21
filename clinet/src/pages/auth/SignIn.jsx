import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In Data", formData);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 slide-in-left">
      <div>
        <h1 className="text-center mb-6">
          Welcome back! Please enter your details
        </h1>
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
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-emerald-900 text-emerald-50 rounded-md hover:bg-emerald-800 transition duration-300"
      >
        Sign In
      </button>

      <p className="text-center mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;
