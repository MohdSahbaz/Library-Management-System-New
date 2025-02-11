import { useContext } from "react";
import { BookContext } from "../../context/BookContext";
import BookCard from "./BookCard";
import MostSoldBooks from "./MostSoldBooks";

const Books = () => {
  return (
    <>
      <BookCard />
      <MostSoldBooks />
    </>
  );
};

export default Books;
