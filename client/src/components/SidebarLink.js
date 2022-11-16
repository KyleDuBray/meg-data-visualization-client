import React from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarLink = ({ to, Icon, children }) => {
  const location = useLocation();
  return (
    <li className="flex justify-center my-1 w-full">
      <div
        className={`${
          location.pathname === to ? "border-r-4 border-gray-200" : ""
        } flex w-full text-gray-300 hover:bg-gray-700 hover:text-white font-medium`}
      >
        <Link
          className="flex ml-0.5 h-11 pl-4 justify-center items-center pr-24"
          to={to}
        >
          {Icon} {children}
        </Link>
      </div>
    </li>
  );
};

export default SidebarLink;
