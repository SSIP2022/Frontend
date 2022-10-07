import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({sidebarData,title}) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className="navbar">
        <div  className="menu-bars" onClick={showSidebar}>
          <FaBars/>
        </div>
        <h3>
          {window.location.pathname.split("/").slice(-1)[0]}
        </h3>
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
