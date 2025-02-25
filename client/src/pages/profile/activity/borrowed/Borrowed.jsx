import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./BorrowedBookList";
import { jwtDecode } from "jwt-decode";

const unreturnedApiUrl = import.meta.env.VITE_API_URL_ACTIVITY;

const Borrowed = () => {
  const [unreturnedBooks, setUnreturnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  let user;

  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        user = jwtDecode(token);
      } catch {
        user = null;
      }
    }
  };

  useEffect(() => {
    checkUser();
    fetchUnreturnedBooks();
  }, [user]);

  const fetchUnreturnedBooks = async () => {
    try {
      const response = await axios.post(
        `${unreturnedApiUrl}/borrowed`,
        { userId: user.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
