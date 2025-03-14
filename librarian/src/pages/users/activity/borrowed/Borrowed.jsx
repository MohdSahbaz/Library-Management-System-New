import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./BorrowedBookList";
import { jwtDecode } from "jwt-decode";

const unreturnedApiUrl = import.meta.env.VITE_API_URL_ACTIVITY;

const Borrowed = ({ userId }) => {
  const [unreturnedBooks, setUnreturnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnreturnedBooks();
  }, [userId]);

  const fetchUnreturnedBooks = async () => {
    try {
      const response = await axios.post(
        `${unreturnedApiUrl}/get-user-borrowed`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("librarianToken")}`,
          },
        }
      );
      setUnreturnedBooks(response.data);
    } catch (error) {
      console.error("Error fetching unreturned books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="slide-in-left">
      <BookList books={unreturnedBooks} loader={loading} heading="" />
    </div>
  );
};

export default Borrowed;
