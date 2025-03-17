import { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import Card from "./Card";
import axios from "axios";
import {
  AlertTriangle,
  CheckCircle,
  Library,
  LucideHourglass,
  Users,
  UserX,
} from "lucide-react";
import Loader from "../../components/common/loader/Loader";

const dashboardDetailApiUrl = import.meta.env.VITE_Dashboard_Detail;

const Dashboard = () => {
  const [dashboardDetail, setDashboardDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("librarianToken");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${dashboardDetailApiUrl}/total`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    scroll(0, 0);
  }, []);

  if (loading) {
    return (
      <>
        <Header pageName={"Dashboard"} />
        <div className="container mx-auto pb-6 px-2">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <Header pageName={"Dashboard"} />
      <div className="md:px-6 p-2">
        <h1 className="pt-5 text-xl text-white">Books Data</h1>
        <div className="flex gap-3 w-full flex-wrap text-gray-200">
          <Card
            icon={<Library size={20} />}
            title={"Total Books"}
            total={dashboardDetail?.totalBooks || 0}
            to={"/books"}
            bgCol={"bg-blue-700"}
            bgColHov={"hover:bg-blue-800"}
          />
          <Card
            icon={<LucideHourglass size={20} />}
            title={"Pending"}
            total={dashboardDetail?.totalPending || 0}
            to={"/pending"}
            bgCol={"bg-yellow-700"}
            bgColHov={"hover:bg-yellow-800"}
          />
          <Card
            icon={<CheckCircle size={20} />}
            title={"Borrowed"}
            total={dashboardDetail?.totalBorrowed || 0}
            to={"/borrowed"}
            bgCol={"bg-green-700"}
            bgColHov={"hover:bg-green-800"}
          />
          <Card
            icon={<AlertTriangle size={20} />}
            title={"Overdue"}
            total={dashboardDetail?.totalOverdue || 0}
            to={"/overdue"}
            bgCol={"bg-red-700"}
            bgColHov={"hover:bg-red-800"}
          />
        </div>

        <h1 className="pt-5 text-xl text-white">Users Data</h1>
        <div className="flex gap-3 w-full flex-wrap text-gray-200">
          <Card
            icon={<Users size={20} />}
            title={"Total Users"}
            total={dashboardDetail?.totalUsers || 0}
            to={"/users"}
            bgCol={"bg-purple-700"}
            bgColHov={"hover:bg-purple-800"}
          />
          <Card
            icon={<UserX size={20} />}
            title={"Unverified Users"}
            total={dashboardDetail?.totalUnverifiedUsers || 0}
            to={"/unverified-users"}
            bgCol={"bg-pink-700"}
            bgColHov={"hover:bg-pink-800"}
          />
        </div>

        <h1 className="pt-5 text-xl text-white">Librarian Data</h1>
        <div className="flex gap-3 w-full flex-wrap text-gray-200">
          <Card
            icon={<Users size={20} />}
            title={"Total Librarians"}
            total={dashboardDetail?.totalLibrarians || "N/A"}
            to={"/librarian"}
            bgCol={"bg-teal-700"}
            bgColHov={"hover:bg-teal-800"}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
