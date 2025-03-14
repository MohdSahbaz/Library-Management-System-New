import { useContext } from "react";
import Header from "../../components/common/Header";
import BookList from "./BookList";
import SearchInput from "./SearchInput";
import { BookContext } from "../../context/BookContext";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const { latestBooks, loader, error } = useContext(BookContext);

  return (
    <>
      <Header pageName={"Books"} />
      {!loader && <SearchInput />}
      <div className="mx-auto pb-6 md:px-6 px-2">
        <BookList books={latestBooks} loader={loader} heading="Latest Books" />
      </div>
      <div
        className="fixed md:bottom-10 bottom-24 md:right-10 right-5"
        onClick={() => navigate("/add-book")}
      >
        <IoIosAddCircle
          size={50}
          // color="blue"
          className="cursor-pointer text-white rounded-full transition"
        />
      </div>
    </>
  );
};

export default Books;
