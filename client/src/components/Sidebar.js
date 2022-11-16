import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CiWavePulse1 } from 'react-icons/ci';

const Sidebar = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <ul className="w-0 invisible md:visible md:w-full h-full flex ml-auto flex-col">
      <li
        className={`${
          location.pathname === '/dashboard/projects'
            ? 'border-r-4 border-gray-200'
            : ''
        } flex justify-center my-2 w-full`}
      >
        <div className="flex text-gray-300 hover:bg-gray-700 hover:text-white font-medium text-center md:mx-8 rounded">
          <HiOutlineLightBulb className="text-white h-6 w-6 mr-2" />
          <Link to="/dashboard/projects">Projects</Link>
        </div>
      </li>

      <li
        className={`${
          location.pathname === '/dashboard/data'
            ? 'border-r-4 border-gray-200'
            : ''
        } flex justify-center my-2 w-full`}
      >
        <div className="flex text-gray-300 hover:bg-gray-700 hover:text-white font-medium text-center md:mx-8 rounded">
          <CiWavePulse1 className="text-white h-6 w-6 mr-2" />
          <Link to="/dashboard/data">Data</Link>
        </div>
      </li>
    </ul>
  );
};

export default Sidebar;
