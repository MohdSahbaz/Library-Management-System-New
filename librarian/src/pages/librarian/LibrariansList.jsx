import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import axios from "axios";
const librarianApiUrl = import.meta.env.VITE_API_URL_LIBRARIAN;
import userImage from "/profileimage.webp";
import Loader from "../../components/common/loader/Loader";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LibrariansList = () => {
  const [librarians, setLibrarians] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLibrarians = async () => {
      const token = localStorage.getItem("librarianToken");
      try {
        const response = await axios.get(`${librarianApiUrl}/alllibrarians`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLibrarians(response.data);
      } catch (error) {
        console.error("Error fetching librarians:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrarians();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this librarian?")) {
      try {
        await axios.delete(`${librarianApiUrl}/librarian/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("librarianToken")}`,
          },
        });
        setLibrarians(librarians.filter((librarian) => librarian._id !== id));
      } catch (error) {
        console.error("Error deleting librarian:", error);
      }
    }
  };

  if (loading) {
    return (
      <>
        <Header pageName={"Librarians"} />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Header pageName={"Librarians"} />
      <div className="md:p-6 p-1 fade-in min-h-[calc(100vh-74px)]">
        <h2 className="text-xl font-bold mb-4">Librarians</h2>
        {librarians.length > 0 ? (
          <div className="">
            <table className="w-full border-collapse border border-gray-700">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-700 px-4 py-2 hidden sm:table-cell">
                    Image
                  </th>
                  <th className="border border-gray-700 px-4 py-2">Name</th>
                  <th className="border border-gray-700 px-4 py-2">Ph. No.</th>
                  <th className="border border-gray-700 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {librarians.map((librarian) => (
                  <tr
                    key={librarian._id}
                    className="bg-gray-900 text-white text-center"
                  >
                    <td className="border border-gray-700 px-4 py-2 hidden sm:table-cell">
                      <img
                        src={librarian.imageUrl || userImage}
                        alt={librarian.name}
                        className="w-12 h-12 rounded-full mx-auto"
                      />
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {librarian.name}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {/* {librarian.phoneNumber} */}1212121212
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      <div className="flex justify-center items-center gap-4">
                        <FaEdit
                          className="text-blue-500 cursor-pointer text-lg"
                          onClick={() =>
                            navigate(`/edit-librarian/${librarian._id}`)
                          }
                        />
                        <div className="h-5 w-px bg-gray-500"></div>{" "}
                        {/* Vertical Line */}
                        <FaTrash
                          className="text-red-500 cursor-pointer text-lg"
                          onClick={() => handleDelete(librarian._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center text-red-500">
            <h1>No librarians found.</h1>
          </div>
        )}
        <div
          className="fixed md:bottom-10 bottom-24 md:right-10 right-5"
          onClick={() => navigate("/add-librarian")}
        >
          <FaPlus
            size={40}
            className="cursor-pointer text-black rounded-full transition bg-white p-2"
          />
        </div>
      </div>
    </>
  );
};

export default LibrariansList;
