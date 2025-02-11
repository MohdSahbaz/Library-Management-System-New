import { Link } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 px-4 relative overflow-hidden">
      {/* Sad Icon with subtle animation */}
      <div className="text-blue-500 text-8xl animate-bounce mb-4">
        <FaSadTear />
      </div>

      {/* Animated 404 heading */}
      <h1 className="text-8xl font-extrabold text-red-500 mb-4 animate-pulse">
        404
      </h1>

      {/* Subtext with a sad face */}
      <p className="text-2xl font-medium mb-6 flex items-center">
        Oops! The page you're looking for doesn't exist.{" "}
        <span className="ml-2 text-3xl animate-wiggle">😢</span>
      </p>

      {/* Button with hover animation */}
      <Link
        to="/"
        className="bg-emerald-700 text-white px-8 py-3 rounded-full shadow-lg hover:bg-emerald-800 hover:scale-105 transition-transform duration-200"
      >
        Go Back Home
      </Link>

      {/* Decorative Floating Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-500 rounded-full opacity-20 animate-float-slow"></div>
    </div>
  );
};

export default NotFound;
