import React, { useEffect, useState } from "react";
import track from "../../../styles/Complain.module.scss";
import Modal from "../../../components/model/index";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { baseURL } from "../../../config/config";
import toast from "react-hot-toast";
import Button from "../../../components/button";

const OfficerComplain = () => {
  const buttonText = {
    open: {
      text: "In Progress",
      color: "rgba(255, 14, 14, 0.59)",
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

  const onclick = () => {
    setDetails(true);
  };
  const onclose = () => {
    setDetails(false);
  };
  async function getUserComplaints() {
    const response = await fetch(
      baseURL + `/user/department-complains?department=health`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log("data:", data);
    if (data.success) {
      setComplaints(data.complains);
    } else {
    }
  }

  async function handleChangeStatus(id, newStatus, index) {
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
    } else {
      toast.error("Fail To Update Status");
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
                  <th>Update</th>
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
                        <td
                          data-label="Staus"
                          className="pass"
                          style={{
                        
                              backgroundColor:buttonText[complain.status.toLowerCase()][
                                "color"
                              ],
                          
                          }}
                        >
                          {complain.status}
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
                          >
                            Details
                          </button>
                        </td>
                        <td style={{ display: "flex" }}>
                          <Button
                            type="button"
                            className={track.button}
                            bgcolor="#23322b"
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
                  To {buttonText[details.status]}
                </h4>
                <Button
                  onClick={() =>
                    handleChangeStatus(
                      details.complain_id,
                      buttonText[details.status.toLowerCase()]
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
