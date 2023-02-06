import React, { useEffect, useState } from "react";
import track from "../../../styles/Complain.module.scss";
import Modal from "../../../components/model/index";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { baseURL } from "../../../config/config";
import toast from "react-hot-toast";
import Button from "../../../components/button";
import Span from "../../../components/span";
import { BsFillCircleFill } from "react-icons/bs";

const OfficerComplain = () => {
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
      text: "In Progress",
      color: "blue",
    },
    "in progress": {
      text: "Resolved",
      color: "rgb(255 146 13)",
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
  console.log("userData:", userData);
  const [complaints, setComplaints] = useState([]);
  const [details, setDetails] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openDetail, setopenDetail] = useState(false);
  const [trace, setTrace] = useState([]);

  const onclick = () => {
    setDetails(true);
  };
  const onclose = () => {
    setDetails(false);
  };
  async function getUserComplaints(filter = "") {
    const endpoint = filter
      ? `/user/department-complains?department=${userData.department}&filter=${filter}`
      : `/user/department-complains?department=${userData.department}`;
    const response = await fetch(baseURL + endpoint, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log("data:", data);
    if (data.success) {
      setComplaints(data.complains);
    } else {
    }
  }

  async function handleChangeStatus(id, newStatus, index) {
    console.log("newStatus:", newStatus);
    if (newStatus == "no action") {
      toast.error("Can not perform this action");
      return;
    }
    const response = await fetch(baseURL + `/complain/update-status`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        status: newStatus,
        complain_id: id,
      }),
    });
    const data = await response.json();
    console.log("data:", data);
    if (data.success) {
      toast.success("Status Updated Successfully");
      setConfirm(false);
      window.location.href = "/officer/home";
    } else {
      toast.error("Fail To Update Status");
    }
  }

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
    getUserComplaints();
  }, []);

  useEffect(() => {
    handleGetStatus();
  }, [openDetail]);

  return (
    <>
      {openDetail ? (
        <>
          <Modal title="Complaint Detail" close={() => setopenDetail(false)}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ margin: "10px auto" }}>
                <img
                  className={track.modalimg}
                  src={
                    details.img_url
                      ? details.img_url
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
                <h4 className={track.decs}>
                  <span>Problem</span> : {details.subject}
                </h4>
                <h4 className={track.decs}>
                  <span>Address</span> : {details.address}
                </h4>
                <h4>
                  <Span text="Address" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                  {details.address}
                </h4>
                <h4>
                  <Span text="Area" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                  {details.area ? details.area : "Near Ahemdabad"}
                </h4>
                <h4>
                  <Span text="Pincode" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                  {details.pincode}
                </h4>
                <h4>
                  <Span text="District" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                  {details.district}
                </h4>
                <h4>
                  <Span text="Status" bgcolor="rgba(167, 164, 165, 0.4)" /> :{" "}
                  {details.status}
                </h4>
                <h4>
                  <Span text="Department" bgcolor="rgba(167, 164, 165, 0.4)" />{" "}
                  : {details.assign_department}
                </h4>
              </div>
              {trace.length !== 0 ? (
                <div style={{ display: "flex", margin: "5px" }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button
              onClick={(e) => {
                getUserComplaints("withdraw");
              }}
              className={track.btn}
            >
              Withdraw
            </button>
            <button
              onClick={(e) => {
                getUserComplaints("open");
              }}
              className={track.btn}
            >
              Open
            </button>
            <button
              onClick={(e) => {
                getUserComplaints("In Progress");
              }}
              className={track.btn}
            >
              In progress
            </button>
            <button
              onClick={(e) => {
                getUserComplaints("Resolved");
              }}
              className={track.btn}
            >
              Resolved
            </button>
            <button
              onClick={(e) => {
                getUserComplaints("closed");
              }}
              className={track.btn}
            >
              Close
            </button>
          </div>
          <div className={track.back}>
            <table className={track.table}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User ID</th>
                  <th>Area</th>
                  <th>Dept</th>
                  <th>Status</th>
                  <th>Date</th>

                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length !== 0 ? (
                  complaints.map((complain, i) => {
                    return (
                      <tr>
                        <td data-label="S.No">{i + 1}</td>
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
                        <td data-label="Area">
                          {" "}
                          {complain.area.length === 0
                            ? "Near Ahemdabad"
                            : complain.area}
                        </td>
                        <td data-label="Dept">{complain.assign_department}</td>
                        <td data-label="Staus" className="pass">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "500",
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
                        </td>
                        <td data-label="Date">
                          {timeFormate(complain.create_at)}
                        </td>

                        <td style={{ display: "flex" }}>
                          <Button
                            // type="button"
                            // className={track.button}
                            // bgcolor="#23322b"
                            style={{
                              backgroundColor: "rgb(48 53 48 / 68%)",
                              padding: "10px 20px",
                              borderRadius: "5px",
                              color: "black",
                              fontWeight: "bold",
                              cursor: "pointer",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            onClick={() => {
                              console.log(
                                buttonText[complain.status.toLowerCase()]
                              );
                              if (
                                buttonText[complain.status.toLowerCase()][
                                  "text"
                                ] !== "No Action"
                              ) {
                                setDetails(complain);
                                setConfirm(true);
                              } else {
                                toast.error("You can't perform this action");
                              }
                            }}
                            id={i}
                            text={
                              buttonText[complain.status.toLowerCase()]["text"]
                            }
                          />
                        </td>
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
                  -- &gt; {buttonText[details.status.toLowerCase()]["text"]}
                </h4>
                <Button
                  onClick={() =>
                    handleChangeStatus(
                      details.complain_id,
                      buttonText[details.status.toLowerCase()]["text"]
                    )
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

export default OfficerComplain;
