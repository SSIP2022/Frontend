import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";
import tasks from "../../../styles/Home.module.scss";
import styles from "../../../styles/Userdashboard.module.scss";
import Modal from "../../../components/model";
import { PickerOverlay } from "filestack-react";
import { baseURL } from "../../../config/config";
import track from "../../../styles/Complain.module.scss";
import Span from "../../../components/span";
const Home = () => {
  const { userData } = useSelector(user);
  const navigate = useNavigate();
  const [openResolve, setOpenResolve] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [isPicker, setIsPicker] = useState(false);
  const [fileName, setFilename] = useState("Choose File");
  const [file_data, setFileData] = useState({});
  const [selectedValue, setSelectedValue] = useState("");
  const [complains, setComplains] = useState([]);
  const [details, setDetails] = useState({});
  const [trace, setTrace] = useState([]);

  const getWorkerComplain = async () => {
    const response = await fetch(
      baseURL + `/user/worker-complains?worker_id=${userData.user_id}`
    );
    const data = await response.json();
    console.log(data);
    setComplains(data["complains"]);
  };

  async function handleGetStatus() {
    const response = await fetch(baseURL + `/complain/trace-complain`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        complain_id: details.complain_id,
      }),
    });
    const data = await response.json();
    console.log("data:", data);
    if (data.success) {
      setTrace(data.trace);
    } else {
    }
  }

  useEffect(() => {
    handleGetStatus();
    console.log(details);
  }, [openDetails, openResolve]);

  useEffect(() => {
    getWorkerComplain();
    console.log(complains);
  }, []);

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
          {/* <Modal close={() => setOpenDetails(false)}>
            <h3>{details.subject}</h3>
          </Modal> */}
          <Modal title="Complaint Detail" close={() => setOpenDetails(false)}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ margin: "10px auto" }}>
              <img
                className={track.modalimg}
                src={
                  JSON.parse(details.file_data[0]).url
                    ? JSON.parse(details.file_data[0]).url
                    : "/istockphoto-1074493878-612x612.png"
                }
                alt=""
              />
            </div>
            <div className={track.details}>
              <h4>
                <Span text="User ID" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.creator_id.slice(-6)}
              </h4>

              <h4>
                <Span text="Subject" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.subject}
              </h4>
              <h4 className={track.decs}>
                <Span text="Description" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.description}
              </h4>
              <h4>
                <Span text="Address" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.address}
              </h4>
              <h4>
                <Span text="Zone" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.zone_name ? details.zone_name : "Near Ahemdabad"}
              </h4>
              <h4>
                <Span text="Ward" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.ward_name}
              </h4>
              <h4>
                <Span text="Status" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.status}
              </h4>
              <h4>
                <Span text="Department" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                {details.assign_department}
              </h4>
            </div>
            {trace.length !== 0 ? (
              <div
                style={{
                  display: "flex",
                  margin: "5px",
                  padding: "0px 0px 0px 30px",
                }}
              >
                <Span text="Status Flow" bgcolor="#fed049" />

                {trace.map((data) => {
                  return (
                    <div style={{ margin: "5px" }}>
                      <Span
                        bgcolor="#6a5c80"
                        color="white"
                        text={data.status}
                      />{" "}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                {" "}
                <div style={{ display: "flex", margin: "5px" }}>
                  <Span text="Status Flow" bgcolor="#fed049" />
                  <div style={{ margin: "5px" }}>
                    <Span text="Open" bgcolor="#6a5c80" color="white" />
                  </div>
                </div>
              </div>
            )}
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
          {complains &&
            complains.map((ele, ind) => {
              return (
                <div key={ind} className={styles.allcomplaints}>
                  <div
                    className={styles.complaints}
                    // onClick={() => {
                    //   setDetails(complaint);
                    //   setOpenModel(true);
                    // }}
                    // style={{ cursor: "pointer" }}
                  >
                    <div className={styles.progresscircle}></div>
                    <span className={styles.text1}>{ele.status}</span>
                    <span className={styles.token}>
                      {ele.complain_id.slice(-6)}
                    </span>
                    <img
                      src={
                        JSON.parse(ele.file_data[0]).url
                          ? JSON.parse(ele.file_data[0]).url
                          : "/istockphoto-1074493878-612x612.png"
                      }
                      className={styles.cImage}
                      alt=""
                    />
                    <span
                      className={styles.text2}
                      type="button"
                      onClick={() => {
                        // setDetails(complaint);
                        // setOpenModel(true);
                      }}
                    >
                      {ele.subject.slice(0, 25) + ".."}{" "}
                      {/* <AiOutlineInfoCircle fontSize="1em" /> */}
                    </span>
                    <div className={styles.detailsbtn}>
                    <span
                      // className={styles.withdraw}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setDetails(ele);
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
                      // className={styles.detailsbtn}
                      onClick={() => {
                        // if (complaint.status != "open") {
                        //     // toast.error("Complaint is in progress");
                        //     return;
                        // }
                        // setWithdraw(true);
                        // setComplaint(complaint);
                        setDetails(ele);
                        setOpenResolve(true);
                      }}
                    >
                      Resolve
                    </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </>
      )}
    </>
  );
};

export default Home;
