const Header = ({ pageName }) => {
  const currentDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex justify-between text-gray-300 bg-gradient-to-l from-black via-gray-900 to-gray-800 shadow-lg md:px-6 p-2 sticky top-0 border-b border-gray-700">
      <div className="bg-gradient-to-l border border-gray-600 from-gray-900 via-gray-800 to-gray-700 px-5 py-1 text-white rounded-md">
        <h1 className="font-bold">{pageName}</h1>
        <p className="text-gray-400">{currentDate}</p>
      </div>
      <div>
        <h1 className="px-5 py-2 bg-gradient-to-l from-gray-900 border border-gray-600 via-gray-800 to-gray-700 text-white font-bold rounded-md">
          LMS
        </h1>
      </div>
    </div>
  );
};

export default Header;
