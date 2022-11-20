import React from "react";
import { MdOutlineCreate } from "react-icons/md";

const Project = () => {
  return (
    <div className="w-11/12 mx-auto mt-5 rounded bg-gray-700">
      <div className="flex">
        <h1 className="text-lg font-medium text-gray-300 p-2">Projects</h1>
        <button className="flex ml-auto items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-1">
          <MdOutlineCreate />
          Create New
        </button>
      </div>
    </div>
  );
};

export default Project;
