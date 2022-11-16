import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Data from './data';
import Project from './projects';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="w-full h-3/4 flex justify-center">
        <div className="invisible md:visible bg-gray-800  h-full rounded-bl-lg">
          <Sidebar />
        </div>
        <div className="w-full bg-white h-full  rounded-br-lg">
          <Routes>
            <Route path="projects" element={<Project />}></Route>
            <Route path="data" element={<Data />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
