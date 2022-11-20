import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes, useParams, useLocation } from "react-router-dom";
import ProjectData from "./ProjectData";
import ProjectUsers from "./ProjectUsers";

const ProjectPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const project = useSelector((state) => {
    return state.project.projects.filter((item) => {
      return item.project_id === parseInt(id);
    })[0];
  });

  return (
    <div className="w-11/12 mx-auto mt-5 rounded bg-gray-700 flex flex-col">
      <div className="flex">
        <h1 className="text-lg font-medium text-gray-300 p-2">
          {project.project_name}
        </h1>
        <div className="flex items-center ml-10 mr-auto">
          <Link
            to={`/dashboard/projects/${id}/data`}
            className={`${
              location.pathname.endsWith("data") ? "border-b" : ""
            } font-medium text-gray-300 mr-5 hover:bg-slate-50 hover:text-black`}
          >
            Data
          </Link>
          <Link
            to={`/dashboard/projects/${id}/users`}
            className={`${
              location.pathname.endsWith("users") ? "border-b" : ""
            } font-medium text-gray-300 mr-5 hover:bg-slate-50 hover:text-black`}
          >
            Users
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="data" element={<ProjectData />}></Route>
        <Route path="users" element={<ProjectUsers />}></Route>
      </Routes>
    </div>
  );
};

export default ProjectPage;
