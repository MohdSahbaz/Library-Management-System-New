import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/common/loader/Loader";

const userApiUrl = import.meta.env.VITE_API_URL_USER;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;

  useEffect(() => {
    window.scroll(0, 0);
    const token = localStorage.getItem("librarianToken");
    const fetchProfile = async () => {
      try {
        if (!token) {
          navigate("/signin");
          return;
        }

        const response = await axios.get(
          `${userApiUrl}/get-user?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="max-w-md mx-auto px-6 rounded-sm bg-gray-800 py-5 fade-in">
      {loading ? (
        <Loader />
      ) : user ? (
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center text-emerald-50">
            Profile
          </h1>
          <div className="flex justify-center items-center">
            <img
              src={user.img || "/profileimage.webp"}
              alt={user.name}
              className="rounded-full w-20 border-2 border-gray-950 mb-8"
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
        </div>
      ) : (
        <p className="text-center text-gray-700">No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
