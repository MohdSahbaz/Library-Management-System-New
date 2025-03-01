import { useEffect } from "react";
import Header from "../../components/common/Header";
import Card from "./Card";
import { BookOpen, Users } from "lucide-react";

const Dashboard = () => {
  useEffect(() => {
    scroll(0, 0);
  }, []);

  return (
    <>
      <Header pageName={"Dashboard"} />
      <div className="min-h-[calc(100vh-85px)] px-5">
        <h1 className="mt-5 text-xl">Books Detail</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card icon={<BookOpen size={20} />} title={"Total"} total={"1k"} />
          <Card icon={<BookOpen size={20} />} title={"Pending"} total={20} />
          <Card icon={<BookOpen size={20} />} title={"Borrowed"} total={500} />
          <Card icon={<BookOpen size={20} />} title={"Overdue"} total={10} />
        </div>
        <h1 className="mt-5 text-xl">Users Detail</h1>
        <div className="flex gap-3 w-full flex-wrap text-white">
          <Card icon={<Users size={20} />} title={"Total"} total={"1k"} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
