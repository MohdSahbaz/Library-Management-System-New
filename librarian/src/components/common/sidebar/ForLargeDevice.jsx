import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Hourglass,
  CheckCircle,
  AlertTriangle,
  Users,
  LogOut,
  GraduationCap,
} from "lucide-react";
import "../../../styles/scroll.css";

const ForLargeDevice = () => {
  const location = useLocation();

  return (
    <div className="hidden scrollbar-hide sticky top-0 overflow-y-auto md:flex flex-col border-r border-white/[0.5] bg-gray-950 text-gray-300 p-5 h-screen w-52 shadow-xl">
      <nav className="flex flex-col space-y-3">
        <NavItem
          to="/"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          currentPath={location.pathname}
        />
        <NavItem
          to="/books"
          icon={<BookOpen size={20} />}
          label="Books"
          currentPath={location.pathname}
        />
        <NavItem
          to="/pending"
          icon={<Hourglass size={20} />}
          label="Pending"
          currentPath={location.pathname}
        />
        <NavItem
          to="/borrowed"
          icon={<CheckCircle size={20} />}
          label="Borrowed"
          currentPath={location.pathname}
        />
        <NavItem
          to="/overdue"
          icon={<AlertTriangle size={20} />}
          label="Overdue"
          currentPath={location.pathname}
        />
        <NavItem
          to="/users"
          icon={<Users size={20} />}
          label="Users"
          currentPath={location.pathname}
        />
        <NavItem
          to="/librarian"
          icon={<GraduationCap size={20} />}
          label="Librarian"
          currentPath={location.pathname}
        />
        <NavItem
          to="/logout"
          icon={<LogOut size={20} />}
          label="Logout"
          currentPath={location.pathname}
        />
      </nav>
    </div>
  );
};

const NavItem = ({ to, icon, label, currentPath }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all duration-300 ${
      currentPath === to
        ? "bg-gradient-to-r from-gray-100 via-gray-300 to-gray-200 text-black border border-gray-400 font-bold shadow-lg hover:from-gray-200 hover:via-gray-400 hover:to-gray-300"
        : "bg-gradient-to-l from-gray-950 via-gray-800 to-black border border-gray-600 text-gray-300 font-medium hover:from-gray-700 hover:via-gray-600 hover:to-gray-500 hover:text-white"
    }`}
  >
    {icon}
    <span className="text-lg">{label}</span>
  </Link>
);

export default ForLargeDevice;
