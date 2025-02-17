import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SearchBookContext } from "../../context/SearchBookContext";
import BookList from "../../components/common/book/BookList";

const SearchBook = () => {
  const { query } = useParams();
  const { searchBook, loader, error, fetchBooks } =
    useContext(SearchBookContext);

  useEffect(() => {
    fetchBooks(query); // Fetch books when query changes
  }, [query]);

  return (
    <div className="bg-emerald-50 md:p-4">
      <BookList
        books={searchBook}
        loader={loader}
        heading={`Searching for "${query}"`}
      />
    </div>
  );
};

export default SearchBook;
