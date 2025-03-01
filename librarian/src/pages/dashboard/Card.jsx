const Card = ({ icon, title, total }) => {
  return (
    <article className="flex-1 basis-0 flex flex-col items-center p-6 px-4 bg-emerald-900/[0.5] shadow-md rounded-sm text-center border border-gray-200 transition-all duration-300">
      <div className="flex items-center gap-2">
        <span className="text-4xl">{icon}</span>
        <h2 className="text-xl font-semibold text-emerald-100 mt-2">
          {title || "Unknown"}
        </h2>
      </div>
      <p className="text-lg text-gray-600 mt-1">Total: {total || "0"}</p>
    </article>
  );
};

export default Card;
