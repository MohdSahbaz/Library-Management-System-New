import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import axios from "axios";
const userApiUrl = import.meta.env.VITE_API_URL_USER;
import userImage from "/profileimage.webp";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/common/loader/Loader";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <>
        <Header pageName={"Users"} />
        <Loader />
      </>
    );
  }

  return (
    <>
      <Header pageName={"Users"} />
      <div className="md:p-6 p-1 fade-in min-h-[calc(100vh-74px)]">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {users.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 p-4 rounded-sm text-center cursor-pointer"
                onClick={() => {
                  navigate(`/user/${user.name.replace(/\s+/g, "-")}`, {
                    state: { userId: user._id },
                  });
                }}
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
        ) : (
          <div className="flex justify-center items-center text-red-500">
            <h1>No user found.</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersList;
