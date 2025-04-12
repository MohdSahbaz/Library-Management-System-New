import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const userId = searchParams.get("userId");
  const bookId = searchParams.get("bookId");

  console.log(userId);
  console.log(bookId);

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const clearOverdueFine = async () => {
      if (!userId || !bookId) {
        setError("Missing userId or bookId in URL.");
        return;
      }

      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL_BORROW}/payment-success`,
          { userId, bookId }
        );

        setMessage("Overdue fine cleared successfully.");
      } catch (err) {
        // setError("Error clearing overdue fine. Please try again.");
      }
    };

    clearOverdueFine();
  }, [userId, bookId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold text-green-600">
        Payment Successful!
      </h1>

      {message && <p className="text-green-500 mt-2">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={() => navigate("/profile")}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        BACK TO PROFILE
      </button>
    </div>
  );
};

export default PaymentSuccess;
