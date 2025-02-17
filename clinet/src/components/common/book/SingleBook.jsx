const SingleBook = () => {
  const book = {
    _id: "67b1a0756070c593cd2c844a",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description:
      "A story of the enigmatic Jay Gatsby and his unrequited love for Daisy Buchanan.",
    genre: "Classic",
    copiesAvailable: 5,
    imageUrl: "https://m.media-amazon.com/images/I/81lHT2pyulL._SL1500_.jpg",
    salesCount: 761,
    createdAt: "2025-08-25T00:00:00",
    updatedAt: "2024-01-19T00:00:00",
  };

  return (
    <div className="flex justify-center items-center bg-emerald-50 p-6">
      <div className="bg-emerald-100/[0.5] shadow-md rounded-sm overflow-hidden flex flex-col md:flex-row w-full max-w-8xl">
        {/* Left: Book Image */}
        <div className="w-full md:w-1/3 p-4">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-full object-cover rounded-sm"
          />
        </div>

        {/* Right: Book Details */}
        <div className="p-6 w-full">
          <h1 className="text-3xl font-semibold">{book.title || "No title"}</h1>
          <h2 className="italic">by {book.author || "Unknown"}</h2>
          <p className="mt-2">{book.description || "...."}</p>

          {/* Book Info */}
          <div className="mt-2">
            <p>
              <strong>Genre:</strong> {book.genre || "Unknown"}
            </p>
            {book.copiesAvailable ? (
              <p>
                <strong>Available:</strong> {book.copiesAvailable}
              </p>
            ) : (
              <p className="text-red-600">
                <strong className="text-emerald-900">Available:</strong> Not
                Available
              </p>
            )}
            <p>
              <strong>Readers:</strong> {book.salesCount || "Undefine"}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Borrow
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
