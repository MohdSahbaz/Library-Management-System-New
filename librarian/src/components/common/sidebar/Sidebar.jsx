import { Outlet } from "react-router-dom";
import ForLargeDevice from "./ForLargeDevice";
import ForSmallDevice from "./ForSmallDevice";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-l from-black via-gray-900 to-gray-800 flex text-gray-300">
      <div className="flex-shrink-0">
        <ForLargeDevice />
        <ForSmallDevice />
      </div>
      <div className="flex-grow pb-24">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
