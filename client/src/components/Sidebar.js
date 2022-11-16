import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { CiWavePulse1 } from "react-icons/ci";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <ul className="w-0 invisible md:visible md:w-full h-full flex ml-auto flex-col">
      <SidebarLink
        to="/dashboard/projects"
        Icon={<HiOutlineLightBulb className="text-white h-6 w-6 mr-2" />}
      >
        Projects
      </SidebarLink>

      <SidebarLink
        to="/dashboard/data"
        Icon={<CiWavePulse1 className="text-white h-6 w-6 mr-2" />}
      >
        Data
      </SidebarLink>
    </ul>
  );
};

export default Sidebar;
