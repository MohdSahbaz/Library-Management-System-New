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
} from "lucide-react";
import Loader from "../../components/common/loader/Loader";

const dashboardDetailApiUrl = import.meta.env.VITE_Dashboard_Detail;

const Dashboard = () => {
  const [dashboardDetail, setDashboardDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("librarianToken"); // Ensure token is retrieved

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
        <h1 className="pt-5 text-xl">Books data</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card
            icon={<Library size={20} />}
            title={"Total Books"}
            total={dashboardDetail?.totalBooks || 0}
            to={"/books"}
          />
          <Card
            icon={<LucideHourglass size={20} />}
            title={"Pending"}
            total={dashboardDetail?.totalPending || 0}
            to={"/pending"}
          />
          <Card
            icon={<CheckCircle size={20} />}
            title={"Borrowed"}
            total={dashboardDetail?.totalBorrowed || 0}
            to={"/borrowed"}
          />
          <Card
            icon={<AlertTriangle size={20} />}
            title={"Overdue"}
            total={dashboardDetail?.totalOverdue || 0}
            to={"/overdue"}
          />
        </div>

        <h1 className="pt-5 text-xl">Users data</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card
            icon={<Users size={20} />}
            title={"Total Users"}
            total={dashboardDetail?.totalUsers || "N/A"}
            to={"/users"}
          />
        </div>

        <h1 className="pt-5 text-xl">Librarian data</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card
            icon={<Users size={20} />}
            title={"Total Librarians"}
            total={dashboardDetail?.totalLibrarians || "N/A"}
            to={"/librarian"}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
