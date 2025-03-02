import { useEffect } from "react";
import Header from "../../components/common/Header";
import Card from "./Card";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Hourglass,
  HourglassIcon,
  Library,
  LucideHourglass,
  Users,
} from "lucide-react";

const Dashboard = () => {
  useEffect(() => {
    scroll(0, 0);
  }, []);

  return (
    <>
      <Header pageName={"Dashboard"} />
      <div className="md:px-6 p-2">
        <h1 className="pt-5 text-xl">Books data</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card
            icon={<Library size={20} />}
            title={"Total"}
            total={"1k"}
            to={"/books"}
          />
          <Card
            icon={<LucideHourglass size={20} />}
            title={"Pending"}
            total={20}
            to={"/pending"}
          />
          <Card
            icon={<CheckCircle size={20} />}
            title={"Borrowed"}
            total={500}
            to={"/borrowed"}
          />
          <Card
            icon={<AlertTriangle size={20} />}
            title={"Overdue"}
            total={10}
            to={"overdue"}
          />
        </div>
        <h1 className="pt-5 text-xl">Users data</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card
            icon={<Users size={20} />}
            title={"Total"}
            total={"1k"}
            to={"/users"}
          />
        </div>
        <h1 className="pt-5 text-xl">Librarian data</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card
            icon={<Users size={20} />}
            title={"Total"}
            total={"1"}
            to={"/librarian"}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
