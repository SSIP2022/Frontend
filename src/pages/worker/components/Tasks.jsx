import React, { useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";
import tasks from "../../../styles/Home.module.scss";
import styles from "../../../styles/Userdashboard.module.scss";
import Modal from "../../../components/model";
import { PickerOverlay } from "filestack-react";
import { baseURL } from "../../../config/config";
const Home = () => {
  const { userData } = useSelector(user);
  const navigate = useNavigate();
  const [openResolve, setOpenResolve] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [isPicker, setIsPicker] = useState(false);
  const [fileName, setFilename] = useState("Choose File");
  const [file_data, setFileData] = useState({});
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const OnSubmitResolved = async () => {
    const response = await fetch(baseURL + `/complain/update-status`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        complain_id: "b696211f-31ea-4ebe-b1eb-b0cccedfcb0c",
        status: "resolved",
        feedback: "test kar raha hun bhai",
        file_data: file_data,
      }),
    });
    const data = await response.json();
    console.log(data);
  };
  return (
    <>
      {openResolve ? (
        <>
          <Modal
            close={() => {
              setIsPicker(false);
              setOpenResolve(false);
            }}
          >
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
                  type="radio"
                  value="resolved"
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                  name="fooby[1][]"
                  onChange={handleChange}
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
                  type="radio"
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                  value="fake"
                  name="fooby[1][]"
                  onChange={handleChange}
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
                  type="radio"
                  style={{ height: "20px", width: "20px", marginRight: "10px" }}
                  value="not defined"
                  name="fooby[1][]"
                />
                Already resolved
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
                  type="radio"
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
                <div style={{ margin: "4px", position: "relative" }}>
                  {isPicker && (
                    <PickerOverlay
                      apikey={"AJbGbxcJRbqofHCOKiyGJz"}
                      action="pick"
                      pickerOptions={{
                        maxSize: 10 * 1024 * 1024,
                      }}
                      onUploadDone={(resp) => {
                        console.log(resp);
                        setFilename(resp.filesUploaded[0].filename);
                        setIsPicker(false);
                        setFileData({
                          role: userData.role,
                          id: userData.user_id,
                          url: resp.filesUploaded[0].url,
                          filename: resp.filesUploaded[0].filename,
                        });
                      }}
                    />
                  )}
                </div>
                <label style={{ display: "flex", alignItems: "center" }}>
                  <input
                    required
                    name="file"
                    id="file"
                    type="button"
                    // disabled
                    // className={form.file}
                    style={{ cursor: "pointer" }}
                    value={fileName}
                    onClick={(e) => {
                      e.preventDefault();
                      isPicker ? setIsPicker(false) : setIsPicker(true);
                    }}
                  />
                </label>
              </div>
              <button
                onClick={() => {
                  OnSubmitResolved();
                  setOpenResolve(false);
                }}
                style={{}}
              >
                Submit
              </button>
            </div>
          </Modal>
        </>
      ) : openDetails ? (
        <>
          <Modal close={() => setOpenDetails(false)}>
            <h3>બંધ થવાનું કારણ</h3>
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
                  setOpenDetails(true);
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
