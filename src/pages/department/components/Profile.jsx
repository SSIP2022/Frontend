import React from "react";
import userprofile from "../../../styles/Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogout, user } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const { userData } = useSelector(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className={userprofile.mainwrapper}>
      <div className={userprofile.dmain}>
        <div className={userprofile.card}>
          <div className={userprofile.image}>
            <img src="/userphoto.png" />
          </div>
          <h1 className={userprofile.name}>
            <span className={userprofile.firstname}>{userData.first_name}</span>
            <span> </span>
            <span className={userprofile.lastname}>{userData.last_name}</span>
          </h1>
          <div className={userprofile.details}>
          <p className={userprofile.area}>
              Role : <span>{userData.role}</span>
            </p>
            <p className={userprofile.email}>
              Email : <span>{userData.email}</span>
            </p>
            <p className={userprofile.number}>
              Mobile number : <span>{userData.mobile_number}</span>
            </p>
            <p className={userprofile.dob}>
              Date of Birth : <span>{userData.birth_date}</span>
            </p>
            <p className={userprofile.gender}>
              Gender : <span>{userData.gender}</span>
            </p>
            <p className={userprofile.pincord}>
              Pincode : <span>{userData.pincode}</span>
            </p>
            <p className={userprofile.area}>
              Area : <span>{userData.area}</span>
            </p>
          </div>
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
  );
};

export default AdminProfile;
