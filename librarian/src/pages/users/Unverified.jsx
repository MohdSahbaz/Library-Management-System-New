import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/common/Header";

const userApiUrl = import.meta.env.VITE_API_URL_USER;

const Unverified = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Unverified Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${userApiUrl}/unverified`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle User Verification
  const handleVerify = async (userId) => {
    try {
      await axios.get(`${userApiUrl}/verifyuser?userId=${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  // Handle User Deletion
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${userApiUrl}/delete-user/${userId}`);
      setUsers(users.filter((user) => user._id !== userId)); // Remove user from list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header pageName="Unverified Users" />
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          Unverified Users
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : users.length === 0 ? (
          <p className="text-gray-400">No unverified users found.</p>
        ) : (
          <>
            {/* Table for medium and larger screens */}
            <div className="hidden md:block bg-gray-800 shadow-lg rounded-lg p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    <th className="py-2 px-4 text-left">Name</th>
                    <th className="py-2 px-4 text-left">Email</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-600">
                      <td className="py-2 px-4">{user.name}</td>
                      <td className="py-2 px-4">{user.email}</td>
                      <td className="py-2 px-4 flex justify-center gap-2">
                        <button
                          onClick={() => handleVerify(user._id)}
                          className="px-3 py-1 text-sm bg-green-600 hover:bg-green-500 text-white rounded"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 text-white rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for small screens */}
            <div className="md:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-gray-800 shadow-md rounded-lg p-4"
                >
                  <p className="text-gray-300 text-lg font-medium">
                    {user.name}
                  </p>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleVerify(user._id)}
                      className="px-3 py-1 text-sm bg-green-600 hover:bg-green-500 text-white rounded"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Unverified;
