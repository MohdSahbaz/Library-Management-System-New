import { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../../components/common/book/OverdueBookList";
import { jwtDecode } from "jwt-decode";

const overdueApiUrl = import.meta.env.VITE_API_URL_OVERDUE;

const Overdue = () => {
  const [overdueBooks, setOverdueBooks] = useState([]);
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
    fetchOverdueBooks();
  }, [user]);

  const fetchOverdueBooks = async () => {
    try {
      const response = await axios.post(
        `${overdueApiUrl}/fine`,
        { userId: user.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
