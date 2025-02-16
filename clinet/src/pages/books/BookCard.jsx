import { useContext, useRef, useState } from "react";
import { BookContext } from "../../context/BookContext";
import "../../components/animations/animations.css";
import {
  PiArrowFatLineLeftFill,
  PiArrowFatLineRightFill,
} from "react-icons/pi";
import "../../styles/scroll.css";
import Loader from "../../components/common/loader/Loader";
import { useNavigate } from "react-router-dom";

const BookCard = () => {
  const navigate = useNavigate();
  const { latestBooks, recommendedBooks, loader } = useContext(BookContext);
  const [toggle, setToggle] = useState(true);
  const scrollRef = useRef(null);

  const booksToDisplay = toggle ? recommendedBooks : latestBooks;

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const BookCard = ({ book }) => (
    <div
      onClick={() => navigate(`/book/${book.title.replace(/\s+/g, "-")}`)}
      className="bg-white px-4 py-2 w-[156px] flex flex-col flex-shrink-0 hover:cursor-pointer group"
    >
      <img
        src={book.imageUrl || "/fallback.jpg"}
        alt={book.title || "Book cover"}
        className="h-48 object-cover group-hover:scale-105 transition-all duration-300 ease-out rounded-sm"
      />
      <h1>{book.title}</h1>
      <p className="text-sm text-gray-600">{book.genre}</p>
    </div>
  );

  return (
    <div className="bg-emerald-50 px-6 py-4">
      <div className="space-x-14 mb-6">
        <button
          className={`${
            toggle ? "" : "text-gray-400"
          } hover:text-emerald-700 transition-all duration-300 ease-out hover:scale-110`}
          onClick={() => setToggle(true)}
        >
          Recommended
        </button>
        <button
          className={`${
            !toggle ? "" : "text-gray-400"
          } hover:text-emerald-700 transition-all duration-300 ease-out hover:scale-110`}
          onClick={() => setToggle(false)}
        >
          Last Added
        </button>
      </div>

      {loader ? (
        <div className="flex justify-center items-center h-40">
          <Loader />
        </div>
      ) : booksToDisplay.length > 0 ? (
        <>
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto flex-shrink-0 scrollbar-hide"
          >
            {booksToDisplay.map((book) => (
              <BookCard key={book.title} book={book} />
            ))}
          </div>
          <div className="my-4 flex justify-between">
            <button onClick={scrollLeft}>
              <PiArrowFatLineLeftFill className="text-2xl" />
            </button>
            <button onClick={scrollRight}>
              <PiArrowFatLineRightFill className="text-2xl" />
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">No books available.</p>
      )}
    </div>
  );
};

export default BookCard;
