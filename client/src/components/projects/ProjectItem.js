import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({
  name,
  activeMembers,
  activeEvents,
  isAdmin,
  projectId,
}) => {
  return (
    <tr className="text-center">
      <td className="py-3">
        <Link
          to={`/dashboard/projects/${projectId}`}
          className="rounded text-gray-300 font-medium hover:bg-slate-100 hover:text-black"
        >
          {name}
        </Link>
        {isAdmin ? (
          <span className="text-xs ml-4 rounded bg-green-200">ADMIN</span>
        ) : (
          ""
        )}
      </td>
      <td className="text-gray-300 font-medium py-4">{activeMembers}</td>
      <td className="text-gray-300 font-medium py-4">{activeEvents}</td>
    </tr>
  );
};

export default ProjectItem;
