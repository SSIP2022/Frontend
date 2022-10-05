import css from "./Sidebar.module.scss"
import { Link } from "react-router-dom";
import React, { useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar"; 

import { FiHome, FiLogOut} from "react-icons/fi";
import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"
import "react-pro-sidebar/dist/css/styles.css";
import "./Headers.scss";
import { Router } from "react-router-dom";


const Sidebar = (props) => {
  
    const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {

    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const [activewin,setActivewin] = useState([false,false,false,false]);
   
  const onclick = (e,index)=>{
    const letsee = activewin.map((e,i)=>{
      if(i===index)
      {
        return true;
      }
      else{
        return false;
      }
    })

    setActivewin(letsee);
    
    console.log("Clicked" + index)
    console.log(activewin)
  }

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
            <p>
                {menuCollapse ? <div className={css.container}>
                  <img className={css.img} src="/logo.jpg" alt="AMC LOGO"/></div>:
                  <div className={css.container}>
                <img className={css.img} src="/logo.jpg" alt="AMC LOGO"/>
                <span className={css.name}>Ahmedabad Municipal Corporation</span>
                </div>}
            </p>
            </div>
            <div className="closemenuWrapper">
                <div className="closemenu" onClick={menuIconClick}>
                {menuCollapse ? (
                    <IoIosArrowForward/>
                ) : (
                    <IoIosArrowBack/>
                )}
                </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {props.catagories.map((e,index)=>{
                return(
                  <div key={index} onClick={(e)=>onclick(e,index)}>
                      <MenuItem active= {activewin[index]}icon={e.logos}>{e.detail}
                        <Link key={index} to={`${e.root}/${e.detail.toLowerCase()}`}/>
                      </MenuItem>
                  </div>
                )
              })}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut/>}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;