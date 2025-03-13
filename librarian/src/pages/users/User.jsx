import React from "react";
import Header from "../../components/common/Header";
import { useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();
  const userId = location.state.userId;
  return (
    <>
      <Header pageName={"User"} />
      <div>
        <h1>{`User => ${userId}`}</h1>
      </div>
    </>
  );
};

export default User;
