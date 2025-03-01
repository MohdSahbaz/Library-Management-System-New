import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Hourglass,
  CheckCircle,
  AlertTriangle,
  Users,
} from "lucide-react";
import "../../../styles/scroll.css";

const ForLargeDevice = () => {
  const location = useLocation(); // Get the current route

  return (
    <div className="hidden scrollbar-hide sticky top-0 overflow-y-auto md:flex flex-col border-r border-emerald-900 bg-emerald-200 text-emerald-900 p-5 h-screen w-52 shadow-lg">
      {/* Navigation Links */}
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
      </nav>
    </div>
  );
};

// Reusable Navigation Item Component with Active Tab Highlighting
const NavItem = ({ to, icon, label, currentPath }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-all duration-300 ${
      currentPath === to
        ? "bg-emerald-700 text-emerald-50 hover:bg-emerald-600"
        : "hover:bg-emerald-400 bg-emerald-300"
    }`}
  >
    {icon}
    <span className="text-lg">{label}</span>
  </Link>
);

export default ForLargeDevice;
