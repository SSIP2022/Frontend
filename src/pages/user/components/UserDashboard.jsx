import React from "react";
import user from "../../../styles/Userdashboard.module.scss"
import { AiOutlineStar } from "react-icons/ai";
import Modal from "../../../components/model";
const UserDashboard = ()=>{
    return(
        <>
        {/* <Modal close={false}>Hellow</Modal> */}
        <div className={user.main}>
        <header className={user.header}>
                <img className={user.photo} src="/logo.jpg" alt="profile"/>
                <div className={user.name}>Dojetobhai Limdiwala</div>
            </header>
          <div className={user.wrapper}>
          <h2 className={user.title}>Complaints</h2>

          <div className={user.allcomplaints}>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Garbage Dumping</span>
              <span className={user.text3}>Near Naroda</span>
              <span className={user.withdraw}>Withdraw</span>
            </div>
            <div className={user.complaints}>
              <div className={user.rejectcircle}></div>
              <span className={user.text1}>Rejected</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Garbage Dumping</span>
              <span className={user.text3}>Near Naroda</span>
              <span className={user.reopen}>Reopen</span>
            </div>
            <div className={user.complaints}>
              <div className={user.resolvedcircle}></div>
              <span className={user.text1}>Resolved</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Water Leakage</span>
              <span className={user.text3}>Near Kakaria Lake</span>
              <span className={user.rate}>
                Rate the service : <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Garbage Dumping</span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Garbage Dumping</span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Garbage Dumping</span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            
          </div>
          <h2 className={user.title}>Complaints Near you</h2>
          <div className={user.allcomplaints}>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Garbage Dumping</span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}>Garbage Dumping</span>
              <span className={user.text3}>Near Naroda</span>
            </div>
          </div>
          </div>
        </div>
        </>
    )
}

export default UserDashboard;