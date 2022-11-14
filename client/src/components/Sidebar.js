import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <ul className="w-0 invisible md:visible md:w-full h-full flex ml-auto flex-col">
      <li
        className={`${
          location.pathname === "/dashboard/projects"
            ? "border-r-4 border-gray-200"
            : ""
        } flex justify-center my-2 w-full`}
      >
        <Link
          className={` text-gray-300 hover:bg-gray-700 hover:text-white font-medium text-center  md:mx-8 lg:mx-16 xl:mx-24 rounded`}
          to="/dashboard/projects"
        >
          Projects
        </Link>
      </li>

      <li
        className={`${
          location.pathname === "/dashboard/data"
            ? "border-r-4 border-gray-200"
            : ""
        } flex justify-center my-2 w-full`}
      >
        <Link
          className={` text-gray-300 hover:bg-gray-700 hover:text-white font-medium text-center  md:mx-8 lg:mx-16 xl:mx-24 rounded`}
          to="/dashboard/data"
        >
          Data
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
