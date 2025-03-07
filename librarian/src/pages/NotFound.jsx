import { Link } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4 relative overflow-hidden">
      {/* Sad Icon with subtle animation */}
      <div className="text-gray-400 text-8xl animate-bounce mb-4">
        <FaSadTear />
      </div>

      {/* Animated 404 heading */}
      <h1 className="text-8xl font-extrabold text-gray-300 mb-4 animate-pulse">
        404
      </h1>

      {/* Subtext */}
      <p className="text-2xl font-medium mb-6 text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="bg-gray-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-gray-500 hover:scale-105 transition-transform duration-200"
      >
        Go Back Home
      </Link>

      {/* Decorative Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-gray-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-gray-600 rounded-full opacity-20 animate-float-slow"></div>
    </div>
  );
};

export default NotFound;
