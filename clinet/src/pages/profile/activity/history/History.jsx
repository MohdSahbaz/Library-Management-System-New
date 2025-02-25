import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import BookList from "./HistoryList";

const historyApiUrl = import.meta.env.VITE_API_URL_ACTIVITY;

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.post(
        `${historyApiUrl}/history`,
        { userId: user.id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
