import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

import { Link } from "react-router-dom";
import "./Sidebar.css";

import { useSelector } from "react-redux";
import { user } from "../../store/userReducer"


function Sidebar({ sidebarData, title }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const {userData} = useSelector(user);

  if(sidebar){
    document.body.style.overflow = "hidden";
  }else{
    document.body.style.overflow = "auto";
  }


  return (
    <>
      <div className="navbar">
        <div className="nav-left">
          
        <div
          className="menu-bars"
          // onMouseEnter={showSidebar}
          onClick={showSidebar}
          >
          <FaBars />
        </div>
        <div className="amc" style={{cursor:"pointer"}} onClick={() =>  window.open("https://ahmedabadcity.gov.in", "_blank")}>
          <img src="/logo.png" className="logo" alt="" />
          <span className="amc-full">Ahmedabad Municipal Corporation</span>
          <span className="amc-short">AMC</span>
          </div>
        </div>
        <div className="nav-center">
        <h3>{window.location.pathname.split("/").slice(-1)[0]}</h3>
        </div>
        <Link to={`profile`}>
        <div className="profile">
          
          <img src="/userphoto.png"  alt="" />
          <span>{userData.first_name}</span>
        </div>
        </Link>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          {sidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>
                    {item.icon} {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
