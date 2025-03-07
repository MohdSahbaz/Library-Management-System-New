import { FaBookOpen } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64 space-y-4 animate-fade-in">
      <FaBookOpen className="text-gray-300 animate-spin-slow text-5xl" />
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-400"></div>
      </div>
    </div>
  );
};

export default Loader;
