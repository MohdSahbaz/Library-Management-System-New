import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BookList from "./HistoryList";

const historyApiUrl = import.meta.env.VITE_API_URL_ACTIVITY;

const History = ({ userId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const fetchHistory = async () => {
    try {
      const response = await axios.post(
        `${historyApiUrl}/get-user-history`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("librarianToken")}`,
          },
        }
      );
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="slide-in-right">
      <BookList books={history} loader={loading} heading="" />
    </div>
  );
};

export default History;
