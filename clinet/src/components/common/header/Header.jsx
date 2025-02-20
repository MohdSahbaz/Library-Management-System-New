import { Outlet } from "react-router-dom";
import ForLargeDevice from "./ForLargDevice";
import ForSmallDevice from "./ForSmallDevice";
import Footer from "../Footer";

const Header = () => {
  return (
    <div className="bg-gray-100 text-emerald-900">
      {/* Header Section for larger device*/}
      <ForLargeDevice />

      {/* Header Section for small device*/}
      <ForSmallDevice />

      {/* Outlet Section */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Header;
