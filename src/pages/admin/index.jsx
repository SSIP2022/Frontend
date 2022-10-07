import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { sidebarData } from "./SidebarData";

const Admin = () => {
  // const {userData} = useSelector(user)
  // const navigate = useNavigate()
  // // if(userData.role != "")
  // navigate(`/${userData.role}/home`)
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
