import axios from "axios";
import { createContext, useEffect, useState } from "react";
const bookApiUrl = import.meta.env.VITE_API_URL_BOOK;

const SearchBookContext = createContext();

const SearchBookProvider = ({ children }) => {
  const [searchBook, setSearchBook] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (query) => {
    if (!query) {
      setSearchBook([]); // Prevent errors
      return;
    } // Prevent API calls if query is empty

    setLoader(true);
    setError(null); // Reset error before fetching

    try {
      const response = await axios.post(`${bookApiUrl}/search`, { query });
      setSearchBook(response.data.books);
    } catch (err) {
      setError("Failed to fetch book data. Please try again later.");
      console.error("Error fetching books:", err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <SearchBookContext.Provider
      value={{ searchBook, loader, error, fetchBooks }}
    >
      {children}
    </SearchBookContext.Provider>
  );
};

export { SearchBookContext, SearchBookProvider };
