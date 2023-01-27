import React, { useEffect, useState } from "react";
import track from "../../../styles/Complain.module.scss";
import Modal from "../../../components/model/index";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { baseURL } from "../../../config/config";
import Button from "../../../components/button";
import toast from "react-hot-toast";
import Span from "../../../components/span";

const Complain = () => {
  const buttonText = {
    open: {
      text: "In Progress",
      color: "rgba(255, 14, 14, 0.59)",
    },
    withdraw: {
      text: "In Progress",
      color: "rgba(29, 255, 10, 0.68)",
    },
    closed: {
      text: "In Progress",
      color: "rgba(29, 255, 10, 0.68)",
    },
    assign: {
      text: "In Progress",
      color: "blue",
    },
    "in progress": {
      text: "Resolved",
      color: "rgba(255, 212, 14, 0.59)",
    },
    resolved: {
      text: "No Action",
      color: "rgba(39, 236, 128, 0.59)",
    },
    "no action": {
      text: "No Action",
      color: "rgba(39, 236, 128, 0.59)",
    },
    rejected: {
      text: "No Action",
      color: "rgba(110, 54, 54, 0.68)",
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
  const [action, setAction] = useState("");
  const [trace, setTrace] = useState([]);

  async function handleChangeStatus(id, newStatus, index) {
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
      window.location.href = "/admin/home";
    } else {
      toast.error("Fail To Update Status");
      setConfirm(false);
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

  async function getUserComplaints() {
    const response = await fetch(baseURL + `/complain/get-all`, {
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
                    <div  style={{ margin: "5px" }}>

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
                  <th>Details</th>
                  <th>Close</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length !== 0 ? (
                  complaints.map((complain, i) => {
                    return (
                      <tr>
                        <td data-label="S.No">{i + 1}</td>
                        <td data-label="Name">
                          {complain.creator_id.slice(-6)}
                        </td>
                        <td data-label="Area">
                          {" "}
                          {complain.area.length === 0
                            ? "Near Ahemdabad"
                            : complain.area}
                        </td>
                        <td data-label="Dept">{complain.assign_department}</td>
                        <td data-label="Staus" className="pass">
                          <Button
                            text={complain.status}
                            bgcolor={
                              buttonText[complain.status.toLowerCase()]["color"]
                            }
                          />
                        </td>
                        <td data-label="Date">
                          {timeFormate(complain.create_at)}
                        </td>
                        <td>
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
                        </td>
                        <td>
                          <Button
                            text="Close"
                            bgcolor="rgba(3, 255, 16, 0.68)"
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
                            bgcolor="rgba(255, 26, 3, 0.68)"
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
