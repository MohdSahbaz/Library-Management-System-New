import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/common/loader/Loader";
import axios from "axios";
import { useState } from "react";
const paymentApiUrl = import.meta.env.VITE_API_URL_PAYMENT;

const BookList = ({ books, loader, heading }) => {
  const [payLoader, setPayLoader] = useState(false);
  const navigate = useNavigate();

  console.log(books);

  // Calculate total fine amount
  const totalFine = books?.reduce((sum, book) => sum + (book.fine || 0), 0);

  const handlePayment = async (
    userId,
    fineAmount,
    borrowId,
    customerName,
    customerEmail,
    customerAddress
  ) => {
    setPayLoader(true);
    try {
      if (!customerName || !customerEmail) {
        return alert("User name and email are required for payment.");
      }

      const { data } = await axios.post(
        `${paymentApiUrl}/create-checkout-session`,
        {
          userId,
          fineAmount,
          borrowId,
          customerName,
          customerEmail,
          customerAddress,
        }
      );

      window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setPayLoader(false);
    }
  };

  return (
    <div className="fade-in px-2 md:px-6">
      {loader ? (
        <Loader />
      ) : books && books.length > 0 ? (
        <>
          <h1 className="text-lg md:text-xl font-semibold mb-4">{heading}</h1>

          {/* ✅ Total Fine Section */}
          <div className="mb-6 p-4 bg-emerald-300/[0.5] shadow-md rounded-sm text-center">
            <h2 className="text-lg font-semibold">Total Fine Amount:</h2>
            <p className="text-red-500 text-xl font-bold">₹{totalFine}</p>
          </div>

          <div className="space-y-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-emerald-200/[0.5] p-4 rounded-sm shadow-md hover:bg-emerald-100 transition"
              >
                {/* Book Header (Image + Title) */}
                <div
                  className="flex items-start cursor-pointer"
                  onClick={() =>
                    navigate(`/book/${book.title.replace(/\s+/g, "-")}`, {
                      state: { bookId: book._id },
                    })
                  }
                >
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-20 h-28 object-cover rounded-md shadow-md mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-semibold hover:text-emerald-600">
                      {book.title}
                    </h2>
                    <p className="text-gray-500 text-sm">{book.author}</p>
                  </div>
                </div>

                {/* Book Details */}
                <div className="mt-3 text-sm">
                  <p>
                    <strong>Borrowed:</strong>{" "}
                    {new Date(book.borrowDate).toLocaleDateString("en-GB")}
                  </p>
                  <p className="text-red-500">
                    <strong>Due:</strong>{" "}
                    {new Date(book.dueDate).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <strong>Fine:</strong> ₹{book.fine || 0}
                  </p>
                </div>

                {/* Pay Fine Button */}
                {book.fine > 0 && (
                  <button
                    className="w-full bg-red-500 text-white py-2 rounded-sm mt-3 hover:bg-red-600 transition"
                    onClick={() =>
                      handlePayment(
                        book.userId,
                        book.fine,
                        book._id,
                        book.userName,
                        book.userEmail,
                        book.userAddress
                      )
                    }
                  >
                    {!payLoader ? "Pay Fine" : "Loading..."}
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 py-4">No books found</p>
      )}
    </div>
  );
};

export default BookList;
