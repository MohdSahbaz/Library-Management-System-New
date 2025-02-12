import { useContext } from "react";
import { BookContext } from "../../context/BookContext";
import BookList from "../../components/common/book/BookList";

const MostSoldBooks = () => {
  const { latestBooks, loader } = useContext(BookContext);
  return <BookList books={latestBooks} loader={loader} />;
};

export default MostSoldBooks;
