const Header = ({ pageName }) => {
  const currentDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex justify-between text-gray-300 z-50 bg-gray-950 shadow-lg md:px-6 p-2 sticky top-0 border-b border-white/[0.5]">
      <div className="bg-gray-800 hover:bg-gray-700 px-5 py-1 text-white rounded-sm transition-all duration-300]">
        <h1 className="font-bold">{pageName}</h1>
        <p className="text-gray-400">{currentDate}</p>
      </div>
      <div className="flex items-center justify-center min-h-full bg-gray-800 text-white px-5 py-2 hover:bg-gray-700 transition-all duration-300">
        <h1 className="font-bold rounded-sm">LMS</h1>
      </div>
    </div>
  );
};

export default Header;
