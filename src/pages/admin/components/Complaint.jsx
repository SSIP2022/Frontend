import React, { useEffect, useState } from "react";
import track from "../../../styles/Complain.module.scss";
import Modal from "../../../components/model/index";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { baseURL, queryfn } from "../../../config/config";
import Button from "../../../components/button";
import toast from "react-hot-toast";
import Span from "../../../components/span";
import { BsFillCircleFill } from "react-icons/bs";
import { Drawer } from "../../../components/drawer/Drawer";

const Complain = () => {
  const buttonText = {
    open: {
      text: "In Progress",
      color: "#391DF2",
    },
    withdraw: {
      text: "In Progress",
      color: "#acacac",
    },
    closed: {
      text: "In Progress",
      color: "#aa4f4f",
    },
    assign: {
      text: "In Progress",
      color: "blue",
    },
    "in progress": {
      text: "Resolved",
      color: "rgb(255 146 13)",
    },
    reopen: {
      text: "No Action",
      color: "#11BF7F",
    },
    resolved: {
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
  };
  function timeFormate(date) {
    const newDate = new Date(date);
    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  }
  const { userData } = useSelector(user);
  const [complaints, setComplaints] = useState([]);
  console.log("complaints:", complaints);
  const [details, setDetails] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openDetail, setopenDetail] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [action, setAction] = useState("");
  const [trace, setTrace] = useState([]);
  const [feedBackMsg, setfeedBackmsg] = useState("");
  const [getComplaintid, setComplaintid] = useState("");

  const onFeedBackSubmit = async (id, msg, visibility = false) => {
    const data = await queryfn({
      endpoint: baseURL + `/complain/addfeedback`,
      reqMethod: "POST",
      body: JSON.stringify({
        feedback_msg: msg,
        visibility: visibility,
        complain_id: id,
      }),
      failMsg: "Add feedback",
    });
    if (data.response == false) {
      toast.error("Error");
      return;
    }
    toast.success("Done");
    setFeedback(false);
  };

  async function handleChangeStatus(id, newStatus, index) {
    const data = await queryfn({
      endpoint: baseURL + `/complain/update-status`,
      reqMethod: "PUT",
      body: JSON.stringify({
        status: newStatus,
        complain_id: id,
      }),
      failMsg: "Error in updating status",
    });
    console.log("Update Status:", data);
    if (data.success) {
      toast.success("Status Updated Successfully");
      setConfirm(false);
      window.location.href = "/admin/home";
    } else {
      toast.error("Fail To Update Status");
      setConfirm(false);
    }
  }

  async function handleGetStatus() {
    const data = await queryfn({
      endpoint: baseURL + `/complain/trace-complain`,
      reqMethod: "POST",
      body: JSON.stringify({
        complain_id: details.complain_id,
      }),
      failMsg: "Error in trace complain ",
    });
    console.log("Trace Complains:", data);
    if (data.success) {
      setTrace(data.trace);
    } else {
    }
  }

  async function getUserComplaints(filter = "") {
    const endpoint = filter
      ? `/complain/get-all?filter=${filter}`
      : "/complain/get-all";

    const data = await queryfn({
      endpoint: baseURL + endpoint,
      reqMethod: "GET",
      failMsg: "Error in get complains",
    });
    console.log("Error in get complains:", data);
    if (data.success) {
      setComplaints(data.complains);
    }
  }

  useEffect(() => {
    getUserComplaints();
  }, []);

  useEffect(() => {
    handleGetStatus();
  }, [openDetail]);

  return (
    <>
      {openDetail ? (
        <>
          <Drawer isActive={openDetail} close={() => setopenDetail(false)}>
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
                  <Span text="Description" bgcolor="rgba(167, 164, 165, 0.4)" />{" "}
                  : {details.description}
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
                {/* <h4>
                  <Span text="Department" bgcolor="rgba(167, 164, 165, 0.4)" />{" "}
                  : {details.assign_department}
                </h4> */}
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
          </Drawer>
        </>
      ) : feedback ? (
        <Modal title="Feedback" close={() => setFeedback(false)}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              margin: "23px",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>
              Please provide your feedback :
            </h3>
            <input
              style={{
                width: "350px",
                height: "40px",
                padding: "10px",
                marginBottom: "20px",
                fontSize: "18px",
                border: "1px solid #ccc",
                borderRadius: "10px",
              }}
              placeholder="Enter your feedback"
              type="text"
              onChange={(e) => {
                setfeedBackmsg(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "19px",
                marginTop: "10px",
              }}
            >
              <input
                style={{ marginRight: "10px", transform: "scale(1.7)" }}
                type="checkbox"
                width="10px"
              />
              <label style={{ fontSize: "18px" }}>
                Send feedback to all users
              </label>
            </div>
            <button
              style={{
                width: "200px",
                height: "50px",
                backgroundColor: "green",
                color: "white",
                fontSize: "18px",
                borderRadius: "10px",
                marginTop: "12px",
              }}
              onClick={() => {
                onFeedBackSubmit(getComplaintid, feedBackMsg);
              }}
            >
              Submit
            </button>
          </div>
        </Modal>
      ) : (
        <>
          <div className={track.container}>
            <button
              onClick={(e) => {
                getUserComplaints("");
              }}
              className={track.btn}
            >
              All
            </button>
            <button
              className={track.btn}
              onClick={(e) => {
                getUserComplaints("withdraw");
              }}
            >
              Withdraw
            </button>
            <button
              className={track.btn}
              onClick={(e) => {
                getUserComplaints("open");
              }}
            >
              Open
            </button>
            <button
              className={track.btn}
              onClick={(e) => {
                getUserComplaints("In Progress");
              }}
            >
              In progress
            </button>
            <button
              className={track.btn}
              onClick={(e) => {
                getUserComplaints("resolved");
              }}
            >
              Resolved
            </button>
            <button
              className={track.btn}
              onClick={(e) => {
                getUserComplaints("closed");
              }}
            >
              Closed
            </button>
          </div>

          <div className={track.back}>
            <table className={track.table}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User ID</th>
                  <th>Token No</th>
                  {/* <th>Area</th> */}
                  <th>Dept</th>
                  <th>Status</th>
                  <th>Date</th>
                  {/* <th>Details</th> */}
                  {/* <th>Close</th>
                  <th>Reject</th>
                  <th>FeedBack</th> */}
                </tr>
              </thead>
              <tbody>
                {complaints.length !== 0 ? (
                  complaints.map((complain, i) => {
                    return (
                      <tr>
                        <td data-label="S.No" style={{ fontWeight: "bold" }}>
                          {i + 1}
                        </td>
                        <td
                          data-label="Name"
                          style={{ textTransform: "uppercase" }}
                        >
                          {complain.creator_id.slice(-6)}
                        </td>
                        <td
                          data-label="Token No"
                          style={{
                            color: "#3a67e3",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            console.log(complain);
                            setDetails(complain);
                            setopenDetail(true);
                          }}
                        >
                          {complain.complain_id.slice(-6)}
                        </td>
                        {/* <td data-label="Area" style={{ fontStyle: "italic" }}>
                          {complain.area.length === 0
                            ? "Near Ahemdabad"
                            : complain.area}
                        </td> */}
                        <td data-label="Dept" style={{ textAlign: "center" }}>
                          {complain.assign_department}
                        </td>

                        <td data-label="Staus" className="pass">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "end",
                              fontWeight: "500",
                              justifyContent: "center",
                            }}
                          >
                            <BsFillCircleFill
                              style={{
                                width: "15px",
                                height: "20px",
                                color:
                                  buttonText[complain.status.toLowerCase()][
                                    "color"
                                  ],

                                marginRight: "10px",
                              }}
                            />
                            <div
                              style={{
                                fontSize: "14px",
                                // fontWeight: "bold",
                                cursor: "pointer",
                              }}
                            >
                              {complain.status}
                            </div>
                          </div>

                          {/* <Button
                            text={complain.status}
                            cursor="auto"
                            bgcolor={
                              buttonText[complain.status.toLowerCase()]["color"]
                            }
                          /> */}
                        </td>
                        <td data-label="Date">
                          {timeFormate(complain.create_at)}
                        </td>
                        {/* <td>
                          <button
                            type="button"
                            onClick={() => {
                              console.log(complain);
                              setDetails(complain);
                              setopenDetail(true);
                            }}
                            className={track.button}
                          >
                            Details
                          </button>
                        </td> */}
                        {/* <td>
                          <Button
                            text="Close"
                            style={{
                              backgroundColor: "rgb(0 253 12 / 68%)",
                              padding: "10px 20px",
                              borderRadius: "5px",
                              color: "rgb(14 7 7)",
                              fontWeight: "bold",
                              cursor: "pointer",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            onClick={() => {
                              if (
                                complain.status.toLowerCase() === "resolved"
                              ) {
                                setDetails(complain);
                                setConfirm(true);
                                setAction("closed");
                              } else {
                                toast.error("You can't perform this action");
                              }
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            text="Reject"
                            style={{
                              backgroundColor: "rgba(255, 26, 3, 0.68)",
                              padding: "10px 20px",
                              borderRadius: "5px",
                              color: "rgb(14 7 7)",
                              fontWeight: "bold",
                              cursor: "pointer",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            onClick={() => {
                              console.log(complain.status.toLowerCase());
                              if (
                                ["open", "assign"].includes(
                                  complain.status.toLowerCase()
                                )
                              ) {
                                setDetails(complain);
                                setConfirm(true);
                                setAction("rejected");
                              } else {
                                toast.error("You can't perform this action");
                              }
                            }}
                          />
                        </td>

                        <td>
                          <Button
                            text="feedback"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.68)",
                              padding: "10px 20px",
                              borderRadius: "5px",
                              color: "#000",
                              fontWeight: "bold",
                              cursor: "pointer",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            onClick={() => {
                              setFeedback(true);
                              setComplaintid(complain.complain_id);
                            }}
                          />
                        </td>*/}
                      </tr>
                    );
                  })
                ) : (
                  <div>No Complaints Found</div>
                )}
              </tbody>
            </table>
            {confirm && (
              <Modal title="Confirm Status" close={() => setConfirm(false)}>
                <h4>
                  Now the status for this complain will become {details.status}{" "}
                  -- &gt; {action}
                </h4>
                <Button
                  onClick={() =>
                    handleChangeStatus(details.complain_id, action)
                  }
                  bgcolor="green"
                  color="white"
                  text="Confirm"
                />
              </Modal>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Complain;
