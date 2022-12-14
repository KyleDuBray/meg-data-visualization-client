import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import EventData from "./data";
import Project from "./projects";
import ProjectPage from "./projects/ProjectPage";

const Dashboard = () => {
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <div className="hidden md:block bg-gray-800  h-full rounded-bl-lg">
          <Sidebar />
        </div>
        <div className="w-full bg-gray-500 h-full  rounded-br-lg">
          <Routes>
            <Route path="projects" element={<Project />}></Route>
            <Route path="projects/:id/*" element={<ProjectPage />}></Route>
            <Route path="data" element={<EventData />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
