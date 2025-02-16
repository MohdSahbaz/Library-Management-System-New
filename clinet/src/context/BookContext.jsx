import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [latestBooks, setLatestBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [mostReadBooks, setMostReadBooks] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoader(true);
      try {
        const [latestResponse, recommendedResponse, mostReadResponse] =
          await Promise.all([
            axios.get("http://localhost:8080/api/books/latest"),
            axios.get("http://localhost:8080/api/books/recommend"),
            axios.get("http://localhost:8080/api/books/mostreadbooks"),
          ]);
        setLatestBooks(latestResponse.data);
        setRecommendedBooks(recommendedResponse.data);
        setMostReadBooks(mostReadResponse.data);
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
    <BookContext.Provider
      value={{ latestBooks, recommendedBooks, mostReadBooks, loader, error }}
    >
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
