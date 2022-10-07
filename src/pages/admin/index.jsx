import React from "react";
import Flex from "../../styles/Flex.module.scss";
import { AiFillPieChart } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import Sidebar from "../../components/sidebar";
import { sidebarData } from "./SidebarData";

const Admin = () => {
  return (
    <>
      <div >
        <Sidebar title="Admin" sidebarData={sidebarData} />
        <Outlet />
      </div>
    </>
  );
};

export default Admin;
