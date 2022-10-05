import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Flex from "../../styles/Flex.module.scss"
import { AiFillPieChart } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import {MdOutlineAccountCircle} from "react-icons/md"

const Admin = ()=>{
    return(
    <>
    <div className={Flex.container}>
        <Sidebar 
        catagories={
        [
            { root:"/admin", detail:"Complaints",logos:<BsClipboardData />},
            { root:"/admin", detail:"Analytics",logos:<AiFillPieChart />},
            { root:"/admin", detail:"Profile",logos:<MdOutlineAccountCircle />}
        ]
        }
        />
        <Outlet/>
    </div>
    </>
    )
}

export default Admin;