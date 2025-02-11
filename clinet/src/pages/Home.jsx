import { Link } from "react-router-dom";
import "../components/animations/animations.css";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-tr from-neutral-50 to-emerald-100 bounce">
      {/* Hero Section */}
      <section
        className="bg-emerald-300 md:py-16 py-4 md:px-6 px-2 text-center"
        style={{
          backgroundImage: "url('HomeBook.png')",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto bg-emerald-50/[0.5] p-6 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold mb-4 animate-float">
            Welcome to LMS
          </h1>
          <p className="text-lg mb-6 bg-emerald-50/[0.5] rounded-sm">
            Your one-stop solution for managing and accessing books, resources,
            and more.
          </p>
          <Link
            to="/books"
            className="bg-emerald-900 text-white font-semibold px-6 py-2 rounded-md hover:bg-emerald-700 transition duration-200"
          >
            Explore Library
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 zoom-in bg-emerald-100">
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Vast Collection</h3>
            <p className="text-gray-700">
              Access thousands of books, journals, and research materials in one
              place.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">User Profiles</h3>
            <p className="text-gray-700">
              Manage your borrowed books, track due dates, and view
              recommendations.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Online Access</h3>
            <p className="text-gray-700">
              Browse and borrow books from anywhere with our online platform.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
