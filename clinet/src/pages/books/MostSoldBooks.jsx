import { useContext } from "react";
import { BookContext } from "../../context/BookContext";
import BookList from "../../components/common/book/BookList";

const MostSoldBooks = () => {
  const { mostReadBooks, loader } = useContext(BookContext);
  return <BookList books={mostReadBooks} loader={loader} />;
};

export default MostSoldBooks;
