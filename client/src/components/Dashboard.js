import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {/* <h1 className="text-3xl font-bold tracking-tight text-gray-900 min-w-full">
        Dashboard
      </h1> */}

      <div className="w-full h-3/4 flex justify-center">
        <div className="invisible md:visible bg-gray-800 md:w-1/4 h-full rounded-bl-lg">
          <Sidebar />
        </div>
        <div className="w-full bg-white h-full md:w-3/4 rounded-br-lg"></div>
      </div>
    </>
  );
};

export default Dashboard;
