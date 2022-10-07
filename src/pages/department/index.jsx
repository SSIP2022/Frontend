import React from 'react'
import Sidebar from "../../components/sidebar";
import { sidebarData } from "./SidebarData";
import { Outlet } from "react-router-dom";
function Department() {
  return (
    <>
    <div >
      <Sidebar title="Department" sidebarData={sidebarData} />
      <Outlet />
    </div>
  </>
  )
}

export default Department