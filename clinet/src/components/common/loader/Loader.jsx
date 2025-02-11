import { FaBookOpen } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4 animate-fade-in">
      <FaBookOpen className="text-emerald-600 animate-spin-slow text-5xl" />
      <h1 className="text-xl animate-bounce">Loading Resources...</h1>
    </div>
  );
};

export default Loader;
