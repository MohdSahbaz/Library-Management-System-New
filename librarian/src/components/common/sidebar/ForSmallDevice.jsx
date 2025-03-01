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
  const location = useLocation(); // Get the current route

  return (
    <div className="md:hidden flex border-t border-emerald-900 justify-between bg-emerald-200 p-3 fixed bottom-0 left-0 right-0 shadow-lg">
      {/* Navigation Icons */}
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
          label="Pending"
          currentPath={location.pathname}
        />
        <NavIcon
          to="/borrowed"
          icon={<CheckCircle size={20} />}
          label="Borrowed"
          currentPath={location.pathname}
        />
        <NavIcon
          to="/overdue"
          icon={<AlertTriangle size={20} />}
          label="Overdue"
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
          label="Librarian"
          currentPath={location.pathname}
        />
        <NavIcon
          to="/logout"
          icon={<LogOut size={20} />}
          label="Logout"
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
        ? "bg-emerald-700 text-emerald-50"
        : "hover:bg-emerald-400 bg-emerald-300 text-emerald-900"
    }`}
  >
    {icon}
  </Link>
);

export default ForSmallDevice;
