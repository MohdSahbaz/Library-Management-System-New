import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/common/Header";
import UserSearchInput from "./UserSearchInput";
import Loader from "../../components/common/loader/Loader";
import userImage from "/profileimage.webp"; // Default image

const userApiUrl = import.meta.env.VITE_API_URL_USER;

const UserSearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const term = params.get("user") || "";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setMessage(null);

      try {
        const response = await axios.get(`${userApiUrl}/search?query=${term}`);
        setUsers(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    if (term) {
      fetchUsers();
    }
  }, [term]);

  return (
    <>
      <Header pageName={"Search User"} />
      <UserSearchInput />
      <div className="container mx-auto px-2 pb-4">
        <h1 className="text-lg font-semibold">Searching for: {term}</h1>

        {loading ? (
          <Loader />
        ) : message ? (
          <p className="text-red-500">{message}</p>
        ) : users.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-gray-800 p-4 rounded-md text-center cursor-pointer hover:shadow-lg transition"
                onClick={() =>
                  navigate(`/user/${user.name.replace(/\s+/g, "-")}`, {
                    state: { userId: user._id },
                  })
                }
              >
                <img
                  src={user.imageUrl || userImage}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3"
                />
                <h3 className="text-lg font-semibold text-white">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-400">{user.city}</p>
                <p className="text-sm text-gray-400">{user.phoneNumber}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center text-gray-400 mt-4">
            <h1>No users found.</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UserSearchResults;
