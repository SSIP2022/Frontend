import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "../../components/sidebar/Sidebar";
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
