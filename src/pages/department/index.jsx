import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { sidebarData } from "./SidebarData";

function Department() {
  return (
    <div>
      <Sidebar title="Admin" sidebarData={sidebarData} />
      <Outlet />
    </div>
  );
}

export default Department;
