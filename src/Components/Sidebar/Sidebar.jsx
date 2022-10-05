import logo from "./logo.jpg";
import css from "./Sidebar.module.scss"

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


const Sidebar = (props) => {
  
    const [menuCollapse, setMenuCollapse] = useState(false)

  const menuIconClick = () => {

    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
            <p>
                {menuCollapse ? <div className={css.container}>
                  <img className={css.img} src={logo} alt="AMC LOGO"/></div>:
                  <div className={css.container}>
                <img className={css.img} src={logo} alt="AMC LOGO"/>
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
              <MenuItem active={true} icon={<FiHome />}>
                Home
              </MenuItem>
              {props.catagories.map((e)=>{
                return(<MenuItem icon={e.logos}>{e.detail}</MenuItem>)
              })}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;