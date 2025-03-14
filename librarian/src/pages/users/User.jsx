import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Profile from "./Profile";
import History from "./activity/history/History";
import Overdue from "./activity/overdue/Overdue";
import Borrowed from "./activity/borrowed/Borrowed";
import Header from "../../components/common/Header";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
const userApiUrl = import.meta.env.VITE_API_URL_USER;

const User = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeActivity, setActiveActivity] = useState("borrowed");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state.userId;

  // Open delete confirmation modal
  const openDeleteModal = () => setDeleteModalOpen(true);
  // Close modal
  const closeDeleteModal = () => setDeleteModalOpen(false);

  // Delete user function
  const handleDeleteUser = async () => {
    const token = localStorage.getItem("librarianToken");
    try {
      await axios.delete(`${userApiUrl}/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/users"); // Redirect to user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(error.response?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <>
      <Header pageName={"User"} />
      <div className="min-h-[calc(100vh-56px)] flex items-start justify-center pt-5">
        <div className="bg-gray-900 shadow-lg rounded-sm overflow-hidden max-w-lg w-full m-5 relative">
          {/* Toggle Buttons */}
          <div className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex-1 text-center py-3 font-semibold transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 text-center py-3 font-semibold transition-all duration-300 ${
                activeTab === "activity"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Activity
            </button>
          </div>

          {/* Dynamic Content */}
          <div className="p-6">
            {activeTab === "profile" ? (
              <Profile />
            ) : (
              <div className="slide-in-right fade-in">
                <div className="flex mb-4 bg-gray-800 rounded-md">
                  <button
                    onClick={() => setActiveActivity("borrowed")}
                    className={`flex-1 py-2 text-center transition-all duration-300 rounded-sm ${
                      activeActivity === "borrowed"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-900 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Borrowed
                  </button>
                  <button
                    onClick={() => setActiveActivity("overdue")}
                    className={`flex-1 py-2 text-center transition-all duration-300 ${
                      activeActivity === "overdue"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-900 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    Overdue
                  </button>
                  <button
                    onClick={() => setActiveActivity("history")}
                    className={`flex-1 py-2 text-center transition-all duration-300 rounded-sm ${
                      activeActivity === "history"
                        ? "bg-gray-700 text-white hover:bg-gray-600"
                        : "bg-gray-900 text-gray-300 hover:bg-gray-700"
                    }`}
                  >
                    History
                  </button>
                </div>

                {/* Render Selected Activity */}
                {activeActivity === "borrowed" && <Borrowed userId={userId} />}
                {activeActivity === "overdue" && <Overdue userId={userId} />}
                {activeActivity === "history" && <History userId={userId} />}
              </div>
            )}
          </div>

          {/* Delete User Button - Positioned Bottom Right */}
          <button
            onClick={openDeleteModal}
            className="absolute bottom-3 right-3 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-500 transition"
            title="Delete User"
          >
            <FaTrash size={18} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteUser}
      />
    </>
  );
};

export default User;
