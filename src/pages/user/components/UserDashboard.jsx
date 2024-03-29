import React, { useState } from "react";
import styles from "../../../styles/Userdashboard.module.scss";
import Button from "../../../components/button";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Drawer } from "../../../components/drawer/Drawer";
import Modal from "../../../components/model";
import { baseURL, queryfn } from "../../../config/config";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import toast from "react-hot-toast";
import Span from "../../../components/span";
import track from "../../../styles/Complain.module.scss";
import { BsFillCircleFill } from "react-icons/bs";
import { Chrono } from "react-chrono";
const UserDashboard = () => {
  const { userData } = useSelector(user);
  console.log("userData:", userData);
  const [confirm, setConfirm] = useState(false);
  const [details, setDetails] = useState({});
  const [openModel, setOpenModel] = useState(false);

  const [complaints, setComplaints] = useState([]);
  const [complain, setComplaint] = useState({});

  const [withdraw, setWithdraw] = useState(false);
  const [trace, setTrace] = useState([]);
  const [feedback, setFeedback] = useState(false);
  const buttonText = {
    open: {
      text: "Assign",
      color: "#391DF2",
    },
    withdraw: {
      text: "No Action",
      color: "#acacac",
    },
    closed: {
      text: "No Action",
      color: "#aa4f4f",
    },
    assign: {
      text: "Closed",
      color: "rgb(255 146 13)",
    },
    resolved: {
      text: "No Action",
      color: "#11BF7F",
    },
    reassign: {
      text: "No Action",
      color: "#11BF7F",
    },
    "no action": {
      text: "No Action",
      color: "rgba(39, 236, 128, 0.59)",
    },
    rejected: {
      text: "No Action",
      color: "red",
    },
    reopen: {
      text: "Assign",
      color: "#391DF2",
    },
  };

  const UpdateStatus = async () => {
    const data = await queryfn({
      endpoint: baseURL + `/complain/update-status`,
      reqMethod: "PUT",
      body: JSON.stringify({
        status: "reopen",
        complain_id: details.complain_id,
      }),
      failMsg: "Error in updataing status",
    });
    console.log("Update Status", data);
    if (data.success) {
      toast.success("Status Updated Successfully");
      setConfirm(false);
    } else {
      toast.error("Fail To Update Status");
    }
  };

  const withdrawComplaint = async () => {
    const data = await queryfn({
      endpoint: baseURL + `/complain/withdraw`,
      reqMethod: "PUT",
      body: JSON.stringify({
        creator_id: userData.user_id,
        complain_id: complain.complain_id,
      }),
      failMsg: "con",
    });
    // const data = await response.json();
    console.log(data);
    setWithdraw(false);
    window.location.href = "/user/dashboard";
  };
  async function getUserComplaints() {
    const data = await queryfn({
      endpoint:
        baseURL + `/complain/user-complains?creator_id=${userData.user_id}`,
      reqMethod: "GET",
      failMsg: "Error in getting data",
    });
    console.log("user all complaints:", data);
    if (data.success) {
      setComplaints(data.complains);
    }
  }

  async function handleGetStatus() {
    const data = await queryfn({
      endpoint: baseURL + `/complain/trace-complain`,
      reqMethod: "POST",
      body: JSON.stringify({
        complain_id: details.complain_id,
      }),
      failMsg: "Error in trace complain",
    });
    console.log("Trace-complains:", data);
    if (data.success) {
      setTrace(data.trace);
    }
  }

  useEffect(() => {
    handleGetStatus();
  }, [openModel]);

  useEffect(() => {
    getUserComplaints();
  }, []);
  useEffect(() => {}, [trace]);
  return (
    <div className={styles.allcomplaints}>
      {complaints.length !== 0 ? (
        complaints.map((complaint) => {
          return (
            <div
              className={styles.complaints}
              // onClick={() => {
              //   setDetails(complaint);
              //   setOpenModel(true);
              // }}
              // style={{ cursor: "pointer" }}
            >
              <div
                style={{
                  position: "relative",
                  top: "20px",
                  left: "15px",
                }}
              >
                <BsFillCircleFill
                  style={{
                    // width: "15px",
                    // height: "20px",
                    color: buttonText[complaint.status.toLowerCase()]["color"],

                    // marginRight: "10px",
                  }}
                />
              </div>
              <span className={styles.text1}>{complaint.status}</span>
              <span className={styles.token}>
                Token No {complaint.complain_id.slice(-6)}
              </span>
              <img
                src={
                  JSON.parse(complaint.file_data[0]).url
                    ? JSON.parse(complaint.file_data[0]).url
                    : "/default_complain.png"
                }
                className={styles.cImage}
                alt=""
              />
              <span
                className={styles.text2}
                type="button"
                onClick={() => {
                  setDetails(complaint);
                  setOpenModel(true);
                }}
              >
                {complaint.subject.slice(0, 25) + ".."}{" "}
                <AiOutlineInfoCircle fontSize="1em" />
              </span>
              <span className={styles.text3}>
                {"Near " + complaint.ward_name}
              </span>
              <div className={styles.detailsbtn}>
                <span
                  // className={styles.detailsbtn}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDetails(complaint);
                    setOpenModel(true);
                  }}
                >
                  Details
                </span>
                {/* <span className={styles.withdraw} onClick={()=>{
               setDetails(complaint);
               setOpenModel(true);
              }}>Withdraw</span> */}
                {complaint.status === "resolved" ? (
                  <span
                    onClick={() => {
                      setConfirm(true);
                      setDetails(complaint);
                    }}
                    style={{ cursor: "pointer" }}
                    // onClick={() => {
                    //   if (complaint.status !== "open") {
                    //     toast.error("Complaint is in progress");
                    //     return;
                    //   }
                    //   setWithdraw(true);
                    //   setComplaint(complaint);
                    // }}
                  >
                    Reopen
                  </span>
                ) : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (complaint.status !== "open") {
                        toast.error("Complaint is in progress");
                        return;
                      }
                      setWithdraw(true);
                      setComplaint(complaint);
                      setDetails(complaint);
                    }}
                  >
                    Withdraw
                  </span>
                )}
                {complaint.status === "withdraw" ||
                complaint.status === "open" ||
                complaint.status === "assign" ? null : (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (complaint.status === "open") {
                        toast.error("Complaint is in progress");
                        return;
                      }
                      if (complaint.status === "withdraw") {
                        toast.error("Complaint is withdrawn");
                        return;
                      }
                      setFeedback(true);
                      setComplaint(complaint);
                      setDetails(complaint);
                      // console.log("details:", details);
                    }}
                  >
                    Feedback
                  </span>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>No Complain Found</div>
      )}

      {withdraw && (
        <Modal title="Confirm To Withdraw" close={() => setWithdraw(false)}>
          <h4>
            Now the status for this complain will become {complain.status} to
            Withdraw
          </h4>
          <Button
            onClick={() => withdrawComplaint()}
            bgcolor="green"
            color="white"
            text="Confirm"
          />
        </Modal>
      )}
      {feedback && (
        <Modal
          title="Feedback from department"
          close={() => {
            setFeedback(false);
          }}
        >
          <div>
            <Span text="Feedback" bgcolor="rgba(167, 164, 165, 0.4)" />:{" "}
            <span style={{ fontWeight: "bold" }}>
              {details.worker_feedback}
            </span>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Span text="Feedback image" bgcolor="rgba(167, 164, 165, 0.4)" />:
            <img
              style={{ width: "100px", height: "100px", marginLeft: "10px" }}
              alt=""
              src={
                JSON.parse(
                  details.file_data[
                    details.status == "resolved"
                      ? details.reopen_count + 1
                      : details.reopen_count
                  ]
                ).url
                  ? JSON.parse(
                      details.file_data[
                        details.status == "resolved"
                          ? details.reopen_count + 1
                          : details.reopen_count
                      ]
                    ).url
                  : "/default_complain.png"
              }
            ></img>
          </div>
        </Modal>
      )}

      {openModel && (
        <Drawer isActive={openModel} close={() => setOpenModel(false)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
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
            <div
              className={track.details}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
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
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: "0px 0px",
                }}
              >
                <Chrono
                  items={trace.map((data) => {
                    return {
                      title: data.status,
                      cardTitle: data.updated_at.slice(0, 10),
                      cardSubtitle: data.updated_at.slice(11, 19),
                      cardDetailedText: data.status,
                    };
                  })}
                  mode="VERTICAL_ALTERNATING"
                  // itemWidth={150}
                  cardWidth={400} // sets the height of the timeline card to 200px
                  cardHeight={100}
                  theme={{
                    primary: "#E1AA74",
                    secondary: "rgba(167, 164, 165, 0.4)",
                    cardBgColor: "#F3F0CA",
                    cardForeColor: "violet",
                    titleColor: "black",
                    titleColorActive: "black",
                  }}
                  // showSingle
                />
                {/* <Span text="Status Flow" bgcolor="#fed049" /> */}

                {trace.map((data) => {
                  return (
                    <div style={{ margin: "5px" }}>
                      {/* <Span
                        bgcolor="#6a5c80"
                        color="white"
                        text={data.status}
                      />{" "} */}
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
        </Drawer>
      )}
      {confirm && (
        <Modal title="Confirm Status" close={() => setConfirm(false)}>
          <h4>
            Now the status for this complain will become {details.status} to
            reopen
          </h4>
          <Button
            onClick={() => {
              UpdateStatus();
            }}
            bgcolor="green"
            color="white"
            text="Confirm"
          />
        </Modal>
      )}
    </div>
    // <>
    //   {details ? (
    //     <>
    //       <div className={styles.main}>
    //         <Modal title="Complaint Detail" close={onclose}>
    //           <div className={styles.modalwrapper}>
    //             <div className={styles.imgwrapper}>
    //               <img
    //                 className={styles.modalimg}
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 alt=""
    //               />
    //             </div>
    //             <div className={styles.details}>
    //               <h4>
    //                 <span>Name</span> : Om Limdiwala
    //               </h4>
    //               <h4>
    //                 <span>Area</span> : kalupur
    //               </h4>
    //               <h4>
    //                 <span>Status</span> : Passed
    //               </h4>
    //               <h4>
    //                 <span>Department</span>: Electricity
    //               </h4>
    //               <h4 className={styles.decs}>
    //                 <span>Description</span> : Lorem ipsum, dolor sit amet
    //                 consectetur adipisicing elit. Ipsum qui accusamus ea magnam
    //                 laudantium culpa deleniti labore enim necessitatibus veniam
    //                 repellat quam neque, sint modi omnis, nemo impedit odit
    //                 voluptate optio aspernatur perferendis vitae quo. Quidem
    //                 provident laborum enim perspiciatis dicta soluta accusantium
    //                 repellat! Molestiae quibusdam nihil beatae voluptate
    //                 perferendis dolor tempora, repudiandae, aliquam, ex facere
    //                 blanditiis? Sit odit placeat excepturi impedit omnis odio
    //                 autem possimus id similique magni dolores dolor neque
    //                 necessitatibus alias dolorem nemo, unde inventore qui,
    //                 expedita nobis! Asperiores eum, eos iusto officiis eveniet
    //                 incidunt mollitia illo magni dolorem nostrum esse ex, ullam
    //                 provident ducimus sint minus.
    //               </h4>
    //             </div>
    //           </div>
    //         </Modal>
    //       </div>
    //     </>
    //   ) : (
    //     <>
    //       <div className={styles.main}>
    //         {/* <header className={styles.header}>
    //             <img className={styles.photo} src="/logo.jpg" alt="profile"/>
    //             <div className={styles.name}>Dojetobhai Limdiwala</div>
    //         </header> */}
    //         <div className={styles.wrapper}>
    //           <h2 className={styles.title}>Complaints</h2>

    //           <div className={styles.allcomplaints}>
    //             <div className={styles.complaints}>
    //               <div className={styles.progresscircle}></div>
    //               <span className={styles.text1}>In Progress</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Garbage Dumping <AiOutlineInfoCircle fontSize="1em" />
    //               </span>

    //               <span className={styles.text3}>Near Naroda</span>
    //               <span className={styles.withdraw}>Withdraw</span>
    //             </div>
    //             <div className={styles.complaints}>
    //               <div className={styles.rejectcircle}></div>
    //               <span className={styles.text1}>Rejected</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Garbage Dumping <AiOutlineInfoCircle />
    //               </span>
    //               <span className={styles.text3}>Near Naroda</span>
    //               <span className={styles.reopen}>Reopen</span>
    //             </div>
    //             <div className={styles.complaints}>
    //               <div className={styles.resolvedcircle}></div>
    //               <span className={styles.text1}>Resolved</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Water Leakage <AiOutlineInfoCircle />
    //               </span>
    //               <span className={styles.text3}>Near Kakaria Lake</span>
    //               <span className={styles.rate}>
    //                 Rate the service : <AiOutlineStar />
    //                 <AiOutlineStar />
    //                 <AiOutlineStar />
    //                 <AiOutlineStar />
    //                 <AiOutlineStar />
    //               </span>
    //             </div>
    //             <div className={styles.complaints}>
    //               <div className={styles.progresscircle}></div>
    //               <span className={styles.text1}>In Progress</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Garbage Dumping <AiOutlineInfoCircle />
    //               </span>
    //               <span className={styles.text3}>Near Naroda</span>
    //             </div>
    //             <div className={styles.complaints}>
    //               <div className={styles.progresscircle}></div>
    //               <span className={styles.text1}>In Progress</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Garbage Dumping <AiOutlineInfoCircle />
    //               </span>
    //               <span className={styles.text3}>Near Naroda</span>
    //             </div>
    //             <div className={styles.complaints}>
    //               <div className={styles.progresscircle}></div>
    //               <span className={styles.text1}>In Progress</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Garbage Dumping <AiOutlineInfoCircle />
    //               </span>
    //               <span className={styles.text3}>Near Naroda</span>
    //             </div>
    //           </div>
    //           <h2 className={styles.title}>Complaints Near you</h2>
    //           <div className={styles.allcomplaints}>
    //             <div className={styles.complaints}>
    //               <div className={styles.progresscircle}></div>
    //               <span className={styles.text1}>In Progress</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Garbage Dumping <AiOutlineInfoCircle />
    //               </span>
    //               <span className={styles.text3}>Near Naroda</span>
    //             </div>
    //             <div className={styles.complaints}>
    //               <div className={styles.progresscircle}></div>
    //               <span className={styles.text1}>In Progress</span>
    //               <span className={styles.token}>Token No #1234</span>
    //               <img
    //                 src="/istockphoto-1074493878-612x612.png"
    //                 className={styles.cImage}
    //                 alt=""
    //               />
    //               <span
    //                 className={styles.text2}
    //                 type="button"
    //                 onClick={onclick}
    //               >
    //                 Garbage Dumping <AiOutlineInfoCircle />
    //               </span>
    //               <span className={styles.text3}>Near Naroda</span>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </>
    //   )}
    // </>
  );
};

export default UserDashboard;
