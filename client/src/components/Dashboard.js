import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Dashboard
      </h1>
    </>
  );
};

export default Dashboard;
