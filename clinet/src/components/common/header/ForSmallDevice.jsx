import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const ForSmallDevice = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const menuRef = useRef(null);
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchKey}`);
  };

  // Close menu when clicking outside
  useEffect(() => {
    setIsLogin;
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsLogin(!!localStorage.getItem("token"));
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="md:hidden flex justify-between items-center bg-emerald-200 px-6 py-2 shadow-md sticky top-0 z-50">
      {/* Left Section: Navigation Links */}
      <div className="text-lg">
        <Link
          to={"/"}
          className="font-bold text-emerald-900 hover:text-emerald-700"
        >
          LMS
        </Link>
      </div>

      {/* Right Section: Search and Buttons */}
      <div className="flex items-center space-x-2">
        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-30 flex items-center bg-white px-3 py-2 rounded-md shadow-sm focus-within:ring focus-within:ring-emerald-300"
        >
          <input
            type="search"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            required
            placeholder="Search book..."
            className="w-32 outline-none text-gray-700 md:w-48 placeholder:text-gray-500 placeholder:font-medium"
          />
          <button type="submit">
            <IoIosSearch className="text-2xl text-emerald-600 ml-2 cursor-pointer hover:text-emerald-700" />
          </button>
        </form>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-emerald-900 text-2xl"
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Navigation buttons */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="absolute right-0 top-14 z-50 bg-white space-y-4 text-xl py-3 flex flex-col justify-center items-start rounded-es shadow-md"
        >
          {isLogin && (
            <Link
              to={"/profile"}
              className="hover:text-emerald-600 transition px-6"
            >
              Profile
            </Link>
          )}
          <Link to={"/"} className="hover:text-emerald-600 transition px-6">
            Home
          </Link>
          <Link
            to={"/about"}
            className="hover:text-emerald-600 transition px-6"
          >
            About
          </Link>
          <Link
            to={"/contact"}
            className="hover:text-emerald-600 transition px-6"
          >
            Contact
          </Link>
          {isLogin ? (
            <button
              onClick={handleLogout}
              className="text-red-500 font-medium hover:text-red-600 transition px-6"
            >
              Logout
            </button>
          ) : (
            <>
              {/* Sign In */}
              <Link
                to={"/signin"}
                className="text-emerald-700 font-medium hover:text-emerald-800 transition px-6"
              >
                Sign In
              </Link>
              {/* Sign Up */}
              <Link
                to={"/signup"}
                className="bg-emerald-600 mx-2 text-white py-2 rounded-lg shadow-md hover:bg-emerald-700 transition px-6"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ForSmallDevice;
