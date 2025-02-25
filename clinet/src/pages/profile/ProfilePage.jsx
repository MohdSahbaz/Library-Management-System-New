import { useState } from "react";
import Profile from "./Profile";
import History from "./activity/history/History";
import Overdue from "./activity/overdue/Overdue";
import Borrowed from "./activity/borrowed/Borrowed";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeActivity, setActiveActivity] = useState("borrowed");

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-start justify-center bg-emerald-50 pt-5">
      <div className="bg-emerald-100/[0.5] shadow-lg rounded-lg overflow-hidden max-w-lg w-full m-5">
        {/* Toggle Buttons */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 text-center py-3 font-semibold ${
              activeTab === "profile"
                ? "bg-emerald-900 text-emerald-50 hover:bg-emerald-800"
                : "bg-emerald-300 text-emerald-900 hover:bg-emerald-500"
            } transition-all duration-300`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("activity")}
            className={`flex-1 text-center py-3 font-semibold ${
              activeTab === "activity"
                ? "bg-emerald-900 text-emerald-50 hover:bg-emerald-800"
                : "bg-emerald-300 text-emerald-900 hover:bg-emerald-500"
            } transition-all duration-300`}
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
              <div className="flex mb-4 bg-emerald-200 rounded-md justify-center">
                <button
                  onClick={() => setActiveActivity("borrowed")}
                  className={`flex-1 py-2 rounded-sm px-2 text-center rounded-r-none border-x-2 border-emerald-900 ${
                    activeActivity === "borrowed"
                      ? "bg-emerald-700 text-emerald-50 hover:bg-emerald-600"
                      : "bg-emerald-200 text-gray-800 hover:bg-emerald-300"
                  } transition-all duration-300`}
                >
                  Borrowed
                </button>
                <button
                  onClick={() => setActiveActivity("overdue")}
                  className={`flex-1 py-2 px-2 text-center rounded-none ${
                    activeActivity === "overdue"
                      ? "bg-emerald-700 text-emerald-50 hover:bg-emerald-600"
                      : "bg-emerald-200 text-gray-800 hover:bg-emerald-300"
                  } transition-all`}
                >
                  Overdue
                </button>
                <button
                  onClick={() => setActiveActivity("history")}
                  className={`flex-1 py-2 rounded-sm px-2 text-center border-x-2 border-emerald-900 rounded-l-none ${
                    activeActivity === "history"
                      ? "bg-emerald-700 text-emerald-50 hover:bg-emerald-600"
                      : "bg-emerald-200 text-gray-800 hover:bg-emerald-300"
                  } transition-all`}
                >
                  History
                </button>
              </div>

              {/* Render Selected Activity */}
              {activeActivity === "borrowed" && <Borrowed />}
              {activeActivity === "overdue" && <Overdue />}
              {activeActivity === "history" && <History />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
