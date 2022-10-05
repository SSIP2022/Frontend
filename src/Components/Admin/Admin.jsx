import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import test from "./test.module.scss"
import { AiFillPieChart } from "react-icons/ai";
import { BsClipboardData } from "react-icons/bs";
import { BiCog } from "react-icons/bi";
import Complaints from "./Complaints";

const Admin = ()=>{
    return(
    <>
    <div className={test.container}>
        <Sidebar 
        catagories={[
            {detail:"Complaints",logos:<BsClipboardData />},
            {detail:"Analytics",logos:<AiFillPieChart />},
            {detail:"Settings",logos:<BiCog />}]}
        />
        <Complaints/>
    </div>
    </>
    )
}

export default Admin;