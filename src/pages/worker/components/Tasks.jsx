import React, {useState} from "react";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";
import tasks from "../../../styles/Home.module.scss";
import styles from "../../../styles/Userdashboard.module.scss";
import Modal from "../../../components/model";
const Home = () => {
const { userData } = useSelector(user);
const navigate = useNavigate();
const [openResolve, setOpenResolve] = useState(false);
return (
    <>
      {openResolve ? (
        <>
          <Modal close={() => setOpenResolve(false)}>Pending</Modal>
        </>
      ) : (
    <>
        <div className={tasks.top}>
            <div className={tasks.greetings}>
                <div className={tasks.greetings_name}>
                    Hi, {userData.first_name}
                </div>  
                <div className={tasks.greetings_welcome}>Welcome to AMC</div>
                <div className={tasks.greetings_welcome}>
                    Your today's tasks
                </div>
            </div>
        </div>
            <div className={styles.allcomplaints}>
            <div
                className={styles.complaints}
            // onClick={() => {
            //   setDetails(complaint);
            //   setOpenModel(true);
            // }}
            // style={{ cursor: "pointer" }}
            >
                <div className={styles.progresscircle}></div>
                <span className={styles.text1}>Open</span>
                <span className={styles.token}>
                    Token No 
                </span>
                {/* <img
                    src={
                        JSON.parse(complaint.file_data[0]).url
                            ? JSON.parse(complaint.file_data[0]).url
                            : "/istockphoto-1074493878-612x612.png"
                    }
                    className={styles.cImage}
                    alt=""
                /> */}
                <span
                    className={styles.text2}
                    type="button"
                    onClick={() => {
                        // setDetails(complaint);
                        // setOpenModel(true);
                    }}
                >
                    chgjdghj
                    {/* <AiOutlineInfoCircle fontSize="1em" /> */}
                </span>
                <span
                    className={styles.withdraw}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        // setDetails(complaint);
                        // setOpenModel(true);
                    }}
                >
                    Details
                </span>
                {/* <span className={styles.withdraw} onClick={()=>{
               setDetails(complaint);
               setOpenModel(true);
              }}>Withdraw</span> */}
                <span 
                style={{ cursor: "pointer" }}
                    className={styles.detailsbtn}
                    onClick={() => {
                        // if (complaint.status != "open") {
                        //     // toast.error("Complaint is in progress");
                        //     return;
                        // }
                        // setWithdraw(true);
                        // setComplaint(complaint);
                        setOpenResolve(true);
                    }}
                >
                    Resolve
                </span>
            </div>
            </div>
    </>
      )}
    </>
);
};

export default Home;
