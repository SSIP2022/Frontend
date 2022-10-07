import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "../../components/sidebar/Sidebar";
import user from "../../styles/Userdashboard.module.scss"
import { BsClipboardData } from "react-icons/bs";
import { FiHome} from "react-icons/fi";
import {MdOutlineAccountCircle} from "react-icons/md"
import Sidebar from "../../components/sidebar";
import { sidebarData } from "./SidebarData";
const UserDashboard= (props) =>{
  return (
    <>
                <Sidebar title="Admin" sidebarData={sidebarData} />

        <Outlet/>
    </>
  );
}

export default UserDashboard;
