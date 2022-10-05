import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Flex from "../../styles/Flex.module.scss"
import { AiFillPieChart } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { FiHome} from "react-icons/fi";
import { BiCog } from "react-icons/bi";
import { Outlet } from "react-router-dom";

const Admin = ()=>{
    return(
    <>
    <div className={Flex.container}>
        <Sidebar 
        catagories={[
            {detail:"Home",logos:<FiHome />},
            {detail:"Complaints",logos:<BsClipboardData />},
            {detail:"Analytics",logos:<AiFillPieChart />},
            {detail:"Settings",logos:<BiCog />}]}
        />
        <Outlet/>
    </div>
    </>
    )
}

export default Admin;