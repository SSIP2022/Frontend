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

import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import {IoIosArrowForward,IoIosArrowBack} from "react-icons/io"
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "./Header.scss";


const Sidebar = () => {
  
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
              <MenuItem icon={<FaList />}>Category</MenuItem>
              <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
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