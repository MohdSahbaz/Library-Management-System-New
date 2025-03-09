import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import axios from "axios";
const userApiUrl = import.meta.env.VITE_API_URL_USER;
import userImage from "/profileimage.webp";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("librarianToken");
      try {
        const response = await axios.get(`${userApiUrl}/allusers`, {
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
        <h2 className="text-xl font-bold mb-4">Users</h2>
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
              <p className="text-sm text-gray-400">{user.city}</p>
              <p className="text-sm text-gray-400">{user.phoneNumber}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Users;
