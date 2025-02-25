import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white py-6 sticky">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left: Brand Info */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">LMS</h2>
          <p className="text-gray-300 mt-1">
            Bringing knowledge closer to you.
          </p>
        </div>

        {/* Center: Navigation Links */}
        <div className="mt-4 md:mt-0">
          <ul className="flex gap-6">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/books" className="hover:underline">
                Books
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Social Media Links */}
        <div className="mt-4 md:mt-0 flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 mt-4 text-sm">
        © {new Date().getFullYear()} LMS. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
