import React from "react";
import adminprofile from "../../../styles/AdminProfile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout, user } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData } = useSelector(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <div className={adminprofile.mainwrapper}>
        <div className={adminprofile.dmain}>
          <div className={adminprofile.card}>
            <div className={adminprofile.image}>
              <img src="/userphoto.png" />
            </div>
            <h1 className={adminprofile.name}>
              <span className={adminprofile.firstname}>
                {userData.first_name}
              </span>
              <span> </span>
              <span className={adminprofile.lastname}>
                {userData.last_name}
              </span>
            </h1>
            <p className={adminprofile.email}>
              Email : <span>{userData.email}</span>
            </p>
            <p className={adminprofile.number}>
              Mobile number : <span>{userData.mobile_number}</span>
            </p>
            <p className={adminprofile.dob}>
              Date of Birth : <span>{userData.birth_date.slice(0, 10)}</span>
            </p>
            <p className={adminprofile.gender}>
              Gender : <span>{userData.gender}</span>
            </p>
            <p className={adminprofile.pincord}>
              Pincode : <span>{userData.pincode}</span>
            </p>
            <p className={adminprofile.area}>
              Area : <span>{userData.area}</span>
            </p>
            <p>
              <button
                onClick={() => {
                  dispatch(setUserLogout());
                  navigate("/");
                }}
              >
                Logout
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
