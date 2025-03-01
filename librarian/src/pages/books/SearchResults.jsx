import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BookList from "./BookList";
import Header from "../../components/common/Header";
import { SearchBookContext } from "../../context/SearchBookContext";

const SearchResults = () => {
  const location = useLocation();

  const { searchBook, loader, error, fetchBooks } =
    useContext(SearchBookContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scroll(0, 0);
    // Extract search term from URL
    const params = new URLSearchParams(location.search);
    const term = params.get("book") || "";
    setSearchTerm(term);
    fetchBooks(term); // Fetch books when term/params changes
  }, [location]);

  return (
    <>
      <Header pageName={"Search Book"} />
      <div className="container mx-auto px-2 pb-4">
        <BookList
          books={searchBook}
          loader={loader}
          heading={`Results for "${searchTerm}"`}
        />
      </div>
    </>
  );
};

export default SearchResults;
