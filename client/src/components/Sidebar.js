import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-0 invisible md:visible md:w-full h-full flex ml-auto flex-col">
      <Link className="text-white text-center" to="/dashboard/projects">
        Projects
      </Link>
      <Link className="text-white text-center" to="/dashboard/data">
        Data
      </Link>
    </div>
  );
};

export default Sidebar;
