import { useContext, useEffect } from "react";
import { BookContext } from "../../context/BookContext";
import BookCard from "./BookCard";
import MostSoldBooks from "./MostSoldBooks";

const Books = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-[calc(100vh-56px)] bg-emerald-50">
      <BookCard />
      <MostSoldBooks />
    </div>
  );
};

export default Books;
