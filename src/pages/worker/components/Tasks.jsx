import React, { useState } from "react";
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
          <Modal close={() => setOpenResolve(false)}>
            <h3>બંધ થવાનું કારણ</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                margin: "10px 0",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  value="1"
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                  name="fooby[1][]"
                />
                Resolve
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                  value="1"
                  name="fooby[1][]"
                />
                Fake
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                  value="1"
                  name="fooby[1][]"
                />
                Not understandable
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "10px 0",
                  fontWeight: "bold",
                }}
              >
                <input
                  type="checkbox"
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                  value="1"
                  name="fooby[1][]"
                />
                Other
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0 10px",
                }}
              >
                <h4 style={{ margin: "0 20px 10px 0", fontWeight: "bold" }}>
                  Upload Image:
                </h4>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    required
                    name="file"
                    id="file"
                    type="file"
                    style={{
                      cursor: "pointer",
                      padding: "10px",
                      border: "1px solid #ccc",
                      backgroundColor: "#fff",
                    }}
                  />
                  
                </label>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        <>
          <div className={tasks.top}>
            <div className={tasks.greetings}>
              <div className={tasks.greetings_name}>
                Hi, {userData.first_name}
              </div>
              <div className={tasks.greetings_welcome}>Welcome to AMC</div>
              <div className={tasks.greetings_welcome}>Your today's tasks</div>
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
              <span className={styles.token}>Token No</span>
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