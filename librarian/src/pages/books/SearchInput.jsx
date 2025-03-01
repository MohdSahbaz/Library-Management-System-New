import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?book=${encodeURIComponent(searchTerm)}`);
    console.log("Searching for:", searchTerm);
  };
  return (
    <div className="container mx-auto pt-6 px-2">
      <form
        onSubmit={handleSearch}
        className="flex items-center border rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 border-emerald-900"
      >
        <input
          type="search"
          placeholder="Search for books..."
          className="w-full px-4 py-2 rounded-sm focus:outline-none focus:ring-2 bg-transparent focus:ring-emerald-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-3 bg-emerald-500 text-white hover:bg-emerald-600 transition"
        >
          <Search size={20} />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
