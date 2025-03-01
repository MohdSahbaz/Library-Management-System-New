import { Outlet } from "react-router-dom";
import ForLargeDevice from "./ForLargeDevice";
import ForSmallDevice from "./ForSmallDevice";

const Sidebar = () => {
  return (
    <div className="bg-emerald-50 flex text-emerald-900">
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
