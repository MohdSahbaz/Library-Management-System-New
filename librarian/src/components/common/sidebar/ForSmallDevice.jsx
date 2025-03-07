import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Hourglass,
  CheckCircle,
  AlertTriangle,
  Users,
  GraduationCap,
  LogOut,
} from "lucide-react";

const ForSmallDevice = () => {
  const location = useLocation();

  return (
    <div className="md:hidden flex border-t border-gray-700 bg-gradient-to-t from-black via-gray-900 to-gray-800 text-gray-300 justify-between p-3 fixed bottom-0 left-0 right-0 shadow-lg">
      <nav className="flex space-x-3 overflow-x-auto pb-4">
        <NavIcon
          to="/"
          icon={<LayoutDashboard size={20} />}
          currentPath={location.pathname}
        />
        <NavIcon
          to="/books"
          icon={<BookOpen size={20} />}
          currentPath={location.pathname}
        />
        <NavIcon
          to="/pending"
          icon={<Hourglass size={20} />}
          currentPath={location.pathname}
        />
        <NavIcon
          to="/borrowed"
          icon={<CheckCircle size={20} />}
          currentPath={location.pathname}
        />
        <NavIcon
          to="/overdue"
          icon={<AlertTriangle size={20} />}
          currentPath={location.pathname}
        />
        <NavIcon
          to="/users"
          icon={<Users size={20} />}
          currentPath={location.pathname}
        />
        <NavIcon
          to="/librarian"
          icon={<GraduationCap size={20} />}
          currentPath={location.pathname}
        />
        <NavIcon
          to="/logout"
          icon={<LogOut size={20} />}
          currentPath={location.pathname}
        />
      </nav>
    </div>
  );
};

// Reusable Navigation Icon Component
const NavIcon = ({ to, icon, currentPath }) => (
  <Link
    to={to}
    className={`flex justify-center items-center p-2 rounded-md transition-all duration-300 ${
      currentPath === to
        ? "bg-gradient-to-t from-gray-100 via-gray-300 to-gray-200 text-black border border-gray-400 font-bold shadow-lg hover:from-gray-200 hover:via-gray-400 hover:to-gray-300"
        : "bg-gradient-to-l from-gray-800 via-gray-700 to-black border border-gray-600 text-gray-300 font-medium hover:from-gray-700 hover:via-gray-600 hover:to-gray-500 hover:text-white"
    }`}
  >
    {icon}
  </Link>
);

export default ForSmallDevice;
