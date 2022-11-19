import React from "react";
import { Link } from "react-router-dom";

const NotificationItem = ({ message }) => {
  return (
    <Link
      to="/dashboard/projects"
      className="block px-4 py-2 text-xs text-white hover:text-gray-800 hover:bg-gray-200"
      role="menuitem"
    >
      {message}
    </Link>
  );
};

export default NotificationItem;
