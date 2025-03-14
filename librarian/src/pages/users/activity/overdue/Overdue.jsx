import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "./OverdueBookList";
import { jwtDecode } from "jwt-decode";

const overdueApiUrl = import.meta.env.VITE_API_URL_ACTIVITY;

const Overdue = ({ userId }) => {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverdueBooks();
  }, [userId]);

  const fetchOverdueBooks = async () => {
    try {
      const response = await axios.post(
        `${overdueApiUrl}/get-user-fine`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("librarianToken")}`,
          },
        }
      );
      setOverdueBooks(response.data.overdueBooks);
    } catch (error) {
      console.error("Error fetching overdue books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <BookList books={overdueBooks} loader={loading} heading="" />
    </div>
  );
};

export default Overdue;
