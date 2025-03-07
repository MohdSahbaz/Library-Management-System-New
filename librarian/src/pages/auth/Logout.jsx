import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Loader from "../../components/common/loader/Loader";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/signin");
  }, [navigate]);

  return (
    <>
      <Header pageName="Logout" />
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <Loader />
      </div>
    </>
  );
};

export default Logout;
