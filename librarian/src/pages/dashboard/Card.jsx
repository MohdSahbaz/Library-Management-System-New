import { Link } from "react-router-dom";

const Card = ({ icon, title, total, to }) => {
  return (
    <>
      {to ? (
        <Link
          to={to}
          className="group cursor-pointer flex-1 basis-0 flex flex-col items-center p-6 px-4 bg-emerald-900/[0.5] hover:bg-emerald-950/[0.5] shadow-md rounded-sm text-center border border-gray-200 transition-all duration-300"
        >
          <div className="flex items-center gap-2">
            <span className="text-4xl text-emerald-900 group-hover:text-emerald-50 transition-all duration-300">
              {icon}
            </span>
            <h2 className="text-xl group-hover:text-emerald-50 font-semibold text-emerald-900 transition-all duration-300">
              {title || "Unknown"}
            </h2>
          </div>
          <p className="text-lg text-gray-600 group-hover:text-emerald-50/[0.5] mt-1 transition-all duration-300">
            Total: {total || "0"}
          </p>
        </Link>
      ) : (
        <article className="group flex-1 basis-0 flex flex-col items-center p-6 px-4 bg-emerald-900/[0.5] hover:bg-emerald-950/[0.5] shadow-md rounded-sm text-center border border-gray-200 transition-all duration-300">
          <div className="flex items-center gap-2">
            <span className="text-4xl">{icon}</span>
            <h2 className="text-xl group-hover:text-emerald-50 font-semibold text-emerald-900 transition-all duration-300">
              {title || "Unknown"}
            </h2>
          </div>
          <p className="text-lg text-gray-600 group-hover:text-emerald-50/[0.5] mt-1 transition-all duration-300">
            Total: {total || "0"}
          </p>
        </article>
      )}
    </>
  );
};

export default Card;
