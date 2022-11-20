import React, { useEffect } from "react";
import { MdOutlineCreate } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useGetProjectsMutation } from "../../slices/projectApi";
import { setProjects } from "../../slices/projectSlice";

const Project = () => {
  const dispatch = useDispatch();

  const [fetchProjects] = useGetProjectsMutation();

  useEffect(() => {
    const getProjectsFunc = async () => {
      try {
        const res = await fetchProjects();
        console.log(res);
        //dispatch(setProjects(res.data));
      } catch {
        console.log("Error fetching projects");
      }
    };

    getProjectsFunc();
  }, [fetchProjects]);

  return (
    <div className="w-11/12 mx-auto mt-5 rounded bg-gray-700">
      <div className="flex">
        <h1 className="text-lg font-medium text-gray-300 p-2">Projects</h1>
        <button className="flex ml-auto items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-1">
          <MdOutlineCreate />
          Create New
        </button>
      </div>
      <table className="w-full mt-5">
        <thead className="w-full">
          <tr className="w-full">
            <th className="text-gray-300 font-medium">Project Name</th>
            <th className="text-gray-300 font-medium">Active Members</th>
            <th className="text-gray-300 font-medium">Active Events</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default Project;
