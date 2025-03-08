import { Link } from "react-router-dom";

const Card = ({ icon, title, total, to, bgCol, bgColHov }) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className={`group hover:-translate-y-2 mt-2 cursor-pointer flex-1 basis-0 flex flex-col items-center p-6 px-4 ${bgCol} bg-gray-800 ${bgColHov} shadow-md rounded-sm text-center border border-gray-800 border-b-white/[0.5] border-b-2 transition-all duration-300`}
        >
          <div className="flex items-center gap-2">
            <span className="text-4xl text-gray-300 group-hover:text-white transition-all duration-300">
              {icon}
            </span>
            <h2 className="text-xl group-hover:text-white font-semibold text-gray-300 transition-all duration-300">
              {title || "Unknown"}
            </h2>
          </div>
          <p className="text-lg text-gray-400 group-hover:text-gray-200 mt-1 transition-all duration-300">
            Total: {total || "0"}
          </p>
        </Link>
      ) : (
        <article className="group flex-1 basis-0 flex flex-col items-center p-6 px-4 bg-gray-800 hover:bg-gray-700 shadow-md rounded-sm text-center border border-gray-700 transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="text-4xl text-gray-300 group-hover:text-white transition-all duration-300">
              {icon}
            </span>
            <h2 className="text-xl group-hover:text-white font-semibold text-gray-300 transition-all duration-300">
              {title || "Unknown"}
            </h2>
          </div>
          <p className="text-lg text-gray-400 group-hover:text-gray-200 mt-1 transition-all duration-300">
            Total: {total || "0"}
          </p>
        </article>
      )}
    </>
  );
};

export default Card;
