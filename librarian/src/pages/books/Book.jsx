import { useState, useEffect, useContext } from "react";
import Header from "../../components/common/Header";
import BookList from "./BookList";
import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { BookContext } from "../../context/BookContext";

const Books = () => {
  const { latestBooks, loader, error } = useContext(BookContext);

  return (
    <>
      <Header pageName={"Books"} />
      <SearchInput />
      <div className="container mx-auto pb-6 px-2">
        <BookList books={latestBooks} loader={loader} heading="Latest Books" />
      </div>
    </>
  );
};

export default Books;
