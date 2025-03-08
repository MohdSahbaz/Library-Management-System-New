import { Outlet } from "react-router-dom";
import ForLargeDevice from "./ForLargeDevice";
import ForSmallDevice from "./ForSmallDevice";

const Sidebar = () => {
  return (
    <div className="bg-gradient-to-l bg-gray-900 flex text-gray-300">
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
