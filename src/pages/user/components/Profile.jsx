import React, { useEffect, useState } from "react";
import userprofile from "../../../styles/Profile.module.scss";
import { baseURL } from "../../../config/config";

const UserProfile = () => {

  const [userdata,setuserdata] = useState({});
  
  const getUserdetails = async()=>{
    const response = await fetch(`http://localhost:5500/user/login`,{
      method:"POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        mobile_number: "7383429359"
      })
    })
    const data = await response.json();
    // console.log(data);  
    setuserdata(data);
    console.log(userdata.user)
  }

  useEffect(()=>{
    getUserdetails();
  },[])

  return (
    <div className={userprofile.mainwrapper}>
    <div className={userprofile.dmain}>
      <div className={userprofile.card}>
        <div className={userprofile.image}>
          <img src="/userphoto.png"/>
        </div>
        <h1 className={userprofile.name}>
          <span className={userprofile.firstname}>{userdata.success === "" ? userdata.user["first_name"] : "dsad"}</span>
          <span className={userprofile.lastname}> Patel</span>
        </h1>
        <p className={userprofile.email}>
          Email : <span>patelpriysnshu2410@gmail.com</span>
        </p>
        <p className={userprofile.number}>
          Mobile number : <span>29419545</span>
        </p>
        <p className={userprofile.dob}>
          Date of Birth : <span>24/10/2003</span>
        </p>
        <p className={userprofile.gender}>
          Gender : <span>Male</span>
        </p>
        <p className={userprofile.pincord}>
          pincord : <span>393010</span>
        </p>
        <p className={userprofile.area}>
          Area : <span>vv nagar</span>
        </p>
        <p>
          <button>Edit</button>
        </p>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
