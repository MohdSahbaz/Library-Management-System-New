import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserSearchInput = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search-user?user=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="container mx-auto py-6 px-2">
      <form
        onSubmit={handleSearch}
        className="flex items-center border rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-gray-500 border-gray-700"
      >
        <input
          type="search"
          placeholder="Search for user..."
          className="w-full px-4 py-2 rounded-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-gray-500 text-gray-200 placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-3 bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default UserSearchInput;
