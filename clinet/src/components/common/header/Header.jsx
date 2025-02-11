import { Outlet } from "react-router-dom";
import ForLargeDevice from "./ForLargDevice";
import ForSmallDevice from "./ForSmallDevice";

const Header = () => {
  return (
    <div className="font-serif bg-gray-100 text-emerald-900">
      {/* Header Section for larger device*/}
      <ForLargeDevice />

      {/* Header Section for small device*/}
      <ForSmallDevice />

      {/* Outlet Section */}
      <Outlet />
    </div>
  );
};

export default Header;
