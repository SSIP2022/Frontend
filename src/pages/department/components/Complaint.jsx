import React, { useEffect, useState } from "react";
import track from "../../../styles/Complain.module.scss";
import Modal from "../../../components/model/index";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { baseURL, queryfn } from "../../../config/config";
import toast from "react-hot-toast";
import Button from "../../../components/button";
import Span from "../../../components/span";
import { BsFillCircleFill } from "react-icons/bs";
import { Drawer } from "../../../components/drawer/Drawer";
import { selectComplains, setComplains } from "../../../store/complainReducer";

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
      text: "No Action",
      color: "rgb(255 146 13)",
    },
    reassign: {
      text: "No Action",
      color: "#11BF7F",
    },
    resolved: {
      text: "Closed",
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

  const dispatch = useDispatch();
  const { userData } = useSelector(user);
  const { complains } = useSelector(selectComplains);
  console.log(complains);
  console.log("userData:", userData);
  // const [complains, setcomplains] = useState([]);
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
  async function getUsercomplains(filter = "") {
    const endpoint = filter
      ? `/user/department-complains?department=${userData.department}&filter=${filter}`
      : `/user/department-complains?department=${userData.department}`;
    // const response = await fetch(baseURL + endpoint, {
    //   method: "GET",
    //   credentials: "include",
    //   headers: {
    //     "Content-type": "application/json;charset=UTF-8",
    //   },
    // });
    // const data = await response.json();
    // console.log("data:", data);
    // if (data.success) {
    //   setcomplains(data.complains);
    // } else {
    //   setcomplains([]);
    // }
    const data = await queryfn({
      endpoint: baseURL + endpoint,
      reqMethod: "GET",
      failMsg: "can not find complain",
    });

    console.log("Complain:: ", data);
    if (data.success) {
      dispatch(setComplains(data.complains));
    }
  }

  async function handleChangeStatus(id, newStatus, index) {
    console.log("newStatus:", newStatus);
    if (newStatus == "no action") {
      return;
    }
    const data = await queryfn({
      endpoint: baseURL + `/complain/update-status`,
      reqMethod: "PUT",
      body: JSON.stringify({
        status: newStatus,
        complain_id: id,
        worker_id: "7d8d864b-8552-4633-aa65-9ceb2eff1a0e",
        department_id: userData.user_id,
      }),
      failMsg: "Error in updataing status",
    });
    console.log("Updated Status:", data);
    if (data.success) {
      toast.success("Status Updated Successfully");
      setConfirm(false);
      window.location.href = "/officer/home";
    } else {
      toast.error("Fail To Update Status");
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
    console.log("Trace complain:", data);
    if (data.success) {
      setTrace(data.trace);
    } else {
    }
  }

  useEffect(() => {
    getUsercomplains();
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
                <h4>
                  <Span text="Department" bgcolor="rgba(167, 164, 165, 0.4)" />{" "}
                  : {details.assign_department}
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
          </Drawer>
        </>
      ) : (
        <>
          <div className={track.container}>
            <button
              onClick={(e) => {
                getUsercomplains("");
              }}
              className={track.btn}
            >
              All
            </button>
            <button
              onClick={(e) => {
                getUsercomplains("withdraw");
              }}
              className={track.btn}
            >
              Withdraw
            </button>
            <button
              onClick={(e) => {
                getUsercomplains("open");
              }}
              className={track.btn}
            >
              Open
            </button>
            <button
              onClick={(e) => {
                getUsercomplains("assign");
              }}
              className={track.btn}
            >
              Assigned
            </button>
            <button
              onClick={(e) => {
                getUsercomplains("resolved");
              }}
              className={track.btn}
            >
              Resolved
            </button>
            <button
              onClick={(e) => {
                getUsercomplains("closed");
              }}
              className={track.btn}
            >
              Close
            </button>
            <button
              onClick={(e) => {
                getUsercomplains("closed");
              }}
              className={track.btn}
            >
              Reassign
            </button>
          </div>
          <div className={track.back}>
            <table className={track.table}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User ID</th>
                  {/* <th>Area</th> */}
                  <th>Zone</th>
                  <th>Ward</th>
                  <th>Dept</th>
                  <th>Status</th>
                  <th>Date</th>

                  <th>Update</th>
                  {/* <th>Reassign</th> */}
                </tr>
              </thead>
              <tbody>
                {complains.length !== 0 ? (
                  complains.map((complain, i) => {
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
                          {complain.creator_id.slice(-6)}
                        </td>
                        <td data-label="Zone">{complain.zone_name}</td>
                        <td data-label="Ward">{complain.ward_name}</td>
                        {/* <td data-label="Area">
                          {" "}
                          {complain.area.length === 0
                            ? "Near Ahemdabad"
                            : complain.ward_name}
                        </td> */}
                        <td data-label="Dept">{complain.assign_department}</td>
                        <td data-label="Staus" className="pass">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "500",
                              justifyContent: "flex-end",
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
                            className={track.update}
                            // bgcolor="#23322b"

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
                        {/* <td>
                          <Button
                            style={{
                              backgroundColor: "rgb(48 53 48 / 68%)",
                              padding: "10px 20px",
                              borderRadius: "5px",
                              color: "black",
                              fontWeight: "bold",
                              cursor: "pointer",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                            }}
                            text="Reassign"
                          />
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <div>No complains Found</div>
                )}
              </tbody>
            </table>
            {confirm && (
              <Modal title="Confirm Status" close={() => setConfirm(false)}>
                <h4>
                  Now the status for this complain will become {details.status}{" "}
                  -- &gt; {buttonText[details.status]["text"].toLowerCase()}
                </h4>
                <Button
                  onClick={() =>
                    handleChangeStatus(
                      details.complain_id,
                      buttonText[details.status]["text"].toLowerCase()
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
