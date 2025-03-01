import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/common/loader/Loader";

const userApiUrl = import.meta.env.VITE_API_URL_USER;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await axios.get(`${userApiUrl}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="max-w-md mx-auto px-6 rounded-2xl fade-in">
      {loading ? (
        <Loader />
      ) : user ? (
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center text-emerald-900">
            Profile
          </h1>
          <div className="flex justify-center items-center">
            <img
              src={user.img || "profileimage.webp"}
              alt={user.name}
              className="rounded-full w-20 border-2 border-emerald-900 mb-8"
            />
          </div>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>City:</strong> {user.city}
          </p>
          <p>
            <strong>Date of Join:</strong>{" "}
            {new Date(user.dateOfJoin).toLocaleDateString("en-GB")}
          </p>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-emerald-600 hover:bg-emerald-700 w-full text-white px-4 py-2 rounded-sm transition-all"
            >
              Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 w-full text-white px-4 py-2 rounded-sm transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-700">No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
