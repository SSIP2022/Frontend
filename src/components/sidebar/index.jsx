import React, { useState,useRef,useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { BsCaretDownFill } from "react-icons/bs";
import { Link,useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useSelector,useDispatch } from "react-redux";
import { user,setUserLogout } from "../../store/userReducer"


function Sidebar({ sidebarData, title }) {
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();
  const {userData} = useSelector(user);
  if(sidebar){
    document.body.style.overflow = "hidden";
  }else{
    document.body.style.overflow = "auto";
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = event => {
    if (dropdownRef.current && dropdownRef.current.contains) {
      if (!dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
        // console.log("clicked outside");
      }
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
        <div>
          
      <div className="dropdown-button"  ref={dropdownRef} onClick={() => setMenuOpen(!menuOpen)}>
      <div className="profile">
          
          <img src="/userphoto.png"  alt="" />
          <span style={{paddingRight:"5px"}}>{userData.first_name}</span>
          <BsCaretDownFill />
        </div>
      </div>
      {menuOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-menu-item"><Link to={`profile`} style={{fontWeight:"100"}}>Your Profile </Link></li>
          <li className="dropdown-menu-item" onClick={() => {
                dispatch(setUserLogout());
                navigate("/");
              }}><span
              
            >
              Logout
            </span></li>
        </ul>
      )}
    </div>
        {/* <Link to={`profile`}>
        <div className="profile">
          
          <img src="/userphoto.png"  alt="" />
          <span>{userData.first_name}</span>
        </div>
        </Link> */}
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
