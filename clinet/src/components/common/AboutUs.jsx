import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../animations/animations.css";

const About = () => {
  // Scroll to top when this component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center bg-emerald-50 min-h-[calc(100vh-56px)] p-6 fade-in">
      <div className="bg-emerald-100/[0.5] shadow-md rounded-sm overflow-hidden flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left: About Us Image */}
        <div className="w-full md:w-1/3 p-4 flex justify-center">
          <img
            src="Library.webp"
            alt="About Us"
            className="h-60 object-cover rounded-sm border border-emerald-800"
          />
        </div>

        {/* Right: About Us Content */}
        <div className="p-6 w-full">
          <h1 className="text-3xl font-semibold text-emerald-900">About Us</h1>
          <p className="mt-4 text-gray-700">
            Welcome to LMS library! We are passionate about bringing knowledge
            to everyone. Our collection features thousands of books across
            different genres, from fiction to self-improvement.
          </p>

          <p className="mt-2 text-gray-700">
            We believe in the power of reading and strive to provide the best
            resources for book lovers. Whether you're looking for the latest
            bestsellers or timeless classics, we have something for everyone.
          </p>

          {/* Contact Info */}
          <div className="mt-4">
            <p>
              <strong>Email:</strong> contact@lms.com
            </p>
            <p>
              <strong>Phone:</strong> +913 456 7890
            </p>
            <p>
              <strong>Address:</strong> Mumbai, India
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
            <Link
              to="/books"
              className="bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition"
            >
              Visit Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
