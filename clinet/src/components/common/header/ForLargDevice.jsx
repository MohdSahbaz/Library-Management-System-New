import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const ForLargeDevice = () => {
  return (
    <div className="md:flex justify-between items-center bg-emerald-200 px-6 py-2 shadow-md hidden sticky top-0 z-50">
      {/* Left Section: Navigation Links */}
      <div className="space-x-6 text-lg">
        <Link
          to={"/"}
          className="font-bold text-emerald-900 border-r-2 border-gray-400 pr-4 hover:text-emerald-700"
        >
          LMS
        </Link>
        <Link
          to={"/about"}
          className="text-gray-700 hover:text-emerald-700 transition"
        >
          About
        </Link>
        <Link
          to={"/contact"}
          className="text-gray-700 hover:text-emerald-700 transition"
        >
          Contact
        </Link>
      </div>

      {/* Right Section: Search and Buttons */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="flex items-center bg-white px-3 py-2 rounded-md shadow-sm focus-within:ring focus-within:ring-emerald-300">
          <input
            type="search"
            placeholder="Search book..."
            className="outline-none text-gray-700 w-48 placeholder:text-gray-500 placeholder:font-medium"
          />
          <IoIosSearch className="text-2xl text-emerald-600 ml-2 cursor-pointer hover:text-emerald-700" />
        </div>

        {/* Sign In */}
        <Link
          to={"/signin"}
          className="text-emerald-700 font-medium hover:text-emerald-800 transition"
        >
          Sign In
        </Link>

        {/* Sign Up */}
        <Link
          to={"/signup"}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default ForLargeDevice;
