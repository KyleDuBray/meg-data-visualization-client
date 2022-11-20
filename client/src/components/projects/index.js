import React, { useEffect } from "react";
import { MdOutlineCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useGetProjectsMutation } from "../../slices/projectApi";
import { setProjects } from "../../slices/projectSlice";
import ProjectItem from "./ProjectItem";

const Project = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.project.projects);

  const [fetchProjects] = useGetProjectsMutation();

  useEffect(() => {
    const getProjectsFunc = async () => {
      try {
        const res = await fetchProjects();
        console.log(res);
        dispatch(setProjects(res.data));
      } catch {
        console.log("Error fetching projects");
      }
    };

    getProjectsFunc();
  }, [fetchProjects]);

  const renderProjectItems = () => {
    return projects.map((item) => {
      return (
        <ProjectItem
          key={item.project_id}
          projectId={item.project_id}
          name={item.project_name}
          activeMembers={item.active_members}
          isAdmin={item.is_admin}
        />
      );
    });
  };

  return (
    <div className="w-11/12 mx-auto mt-5 rounded bg-gray-700">
      <div className="flex items-center w-11/12 mx-auto">
        <h1 className="text-lg font-medium text-gray-300">Projects</h1>
        <button className="flex m-2 ml-auto items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-1">
          <MdOutlineCreate className="mr-1" />
          Create New
        </button>
      </div>
      <table className="w-11/12 mt-5 mx-auto">
        <thead className="w-full border-b border-gray-600">
          <tr className="w-full">
            <th className="text-gray-300 font-medium">Project Name</th>
            <th className="text-gray-300 font-medium">Active Members</th>
            <th className="text-gray-300 font-medium">Active Events</th>
          </tr>
        </thead>
        <tbody>{renderProjectItems()}</tbody>
      </table>
    </div>
  );
};

export default Project;
