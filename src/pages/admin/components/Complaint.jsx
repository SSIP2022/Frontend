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
    close: {
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
    reject: {
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
  const [details, setDetails] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openDetail, setopenDetail] = useState(false);
  const [action, setAction] = useState("");

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
    } else {
      toast.error("Fail To Update Status");
      setConfirm(false);
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

  return (
    <>
      {openDetail ? (
        <>
          <Modal title="Complaint Detail" close={() => setopenDetail(false)}>
            <div className={track.modalwrapper}>
              <div className={track.imgwrapper}>
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
                  <span>User ID </span> : {details.creator_id.slice(-6)}
                </h4>
                <h4>
                  <span>Area</span> :{" "}
                  {details.area ? details.area : "Near Ahemdabad"}
                </h4>
                <h4>
                  <span>Status</span> : {details.status}
                </h4>
                <h4>
                  <span>Department</span>: {details.assign_department}
                </h4>
                <h4 className={track.decs}>
                  <span>Description</span> : {details.description}
                </h4>
              </div>
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
                                setAction("Close");
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
                                setAction("Reject");
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
                  To {action}
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
