import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const bookApiUrl = import.meta.env.VITE_API_URL_BOOK;

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoader(true);
      try {
        const latestResponse = await axios.get(`${bookApiUrl}/latest`);
        setLatestBooks(latestResponse.data);
      } catch (err) {
        setError("Failed to fetch book data. Please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoader(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ latestBooks, loader, error }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
