import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUsersForProjectMutation } from "../../slices/projectApi";
import { AiOutlineUserAdd } from "react-icons/ai";

const ProjectUsers = () => {
  const { id } = useParams();
  const [fetchUsers] = useGetUsersForProjectMutation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsersFunc = async () => {
      try {
        const res = await fetchUsers(parseInt(id));
        console.log(res);
        setUsers(res.data);
      } catch {
        console.log("Error fetching projects");
      }
    };

    getUsersFunc();
  }, [fetchUsers, id]);

  const renderUserRows = () => {
    return users.map((user) => {
      return (
        <tr className="text-center">
          <td className="text-gray-300 font-medium py-4">
            {user.first_name + " " + user.last_name}
            {user.is_admin ? (
              <span className="text-black text-xs ml-4 rounded bg-green-200">
                ADMIN
              </span>
            ) : (
              ""
            )}
          </td>
          <td className="text-gray-300 font-medium py-4">{user.email}</td>
        </tr>
      );
    });
  };

  return (
    <div className="flex flex-col">
      <table className="w-11/12 mt-5 mx-auto">
        <thead className="w-full border-b border-gray-600">
          <tr className="w-full">
            <th className="text-gray-300 font-medium">Member</th>
            <th className="text-gray-300 font-medium">email</th>
          </tr>
        </thead>
        <tbody>{renderUserRows()}</tbody>
      </table>

      <button className="flex m-2 mr-auto mt-5 ml-5 mb-5 items-center text-white bg-gray-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-1">
        <AiOutlineUserAdd className="mr-1" />
        Add New User
      </button>
    </div>
  );
};

export default ProjectUsers;
