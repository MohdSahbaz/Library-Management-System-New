import { useEffect } from "react";
import Header from "../../components/common/Header";

const Dashboard = () => {
  useEffect(() => {
    scroll(0, 0);
  }, []);

  return (
    <>
      <Header pageName={"Dashboard"} />
      <div className=""></div>
    </>
  );
};

export default Dashboard;
