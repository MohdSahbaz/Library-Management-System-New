import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import axios from "axios";
const librarianApiUrl = import.meta.env.VITE_API_URL_LIBRARIAN;
import userImage from "/profileimage.webp";

const Librarian = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("librarianToken");
      try {
        const response = await axios.get(`${librarianApiUrl}/alllibrarians`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <Header pageName={"Users"} />
      <div className="p-6 fade-in min-h-[calc(100vh-74px)]">
        <h2 className="text-xl font-bold mb-4">Librarians</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 p-4 rounded-lg text-center"
            >
              <img
                src={user.imageUrl || userImage}
                alt={user.name}
                className="w-24 h-24 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.phoneNumber}</p>
              <p className="text-sm text-gray-400">
                {new Date(user.dateOfJoin).toLocaleDateString("en-GB")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Librarian;
