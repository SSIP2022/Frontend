import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { AiFillPieChart } from "react-icons/ai";
import user from "../../styles/Userdashboard.module.scss"
import { BsClipboardData } from "react-icons/bs";
import { FiHome} from "react-icons/fi";
import {MdOutlineAccountCircle} from "react-icons/md"

const UserDashboard= () =>{
  return (
    <>
      <div className={user.container}>
      <Sidebar 
        catagories={
          [
            {root:"/user", detail:"RegisterComplaint",logos:<FiHome />},
            {root:"/user", detail:"Dashboard",logos:<BsClipboardData />},
            {root:"/user", detail:"Profile",logos:<MdOutlineAccountCircle />},
          ]}
        />
        <Outlet/>
      </div>
    </>
  );
}

export default UserDashboard;
