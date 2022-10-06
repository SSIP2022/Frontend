import React from 'react'
import userprofile from '../../../styles/Profile.module.scss'
const UserProfile = ()=> {
  return (
    <div className={userprofile.main}>
      {/* <button onClick={() => profileData()}>New Person</button> */}
      <div className={userprofile.card}>
        <img src="/userphoto.png" className={userprofile.image}/>
        <h1 className={userprofile.name}><span className={userprofile.firstname}>Priyanshu</span><span className={userprofile.lastname}> Patel</span></h1>
        <p className={userprofile.email}>Email : <span>patelpriysnshu2410@gmail.com</span></p>
        <p className={userprofile.number}>Mobile number :  <span>29419545</span></p>
        {/* <p className={userprofile.Address}>Address : <span>adit boys hoste Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, sunt.</span></p> */}
        <p className={userprofile.dob}>Date of Birth :  <span>24/10/2003</span></p>
        <p className={userprofile.gender}>Gender :  <span>Male</span></p>
        <p className={userprofile.pincord}>pincord :  <span>393010</span></p>
        <p className={userprofile.area}>Area :  <span>vv nagar</span></p>
        <p>
          <button>Edit</button>
        </p>
      </div>
    </div>
  
  );
};

export default UserProfile;