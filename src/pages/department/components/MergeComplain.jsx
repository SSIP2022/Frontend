import React, { useEffect, useState } from "react";
import track from "../../../styles/Complain.module.scss";
import Modal from "../../../components/model/index";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { baseURL, queryfn } from "../../../config/config";
import toast from "react-hot-toast";
import Button from "../../../components/button";
import Span from "../../../components/span";
import { BsFillCircleFill } from "react-icons/bs";
import { Drawer } from "../../../components/drawer/Drawer";

function MergeComplain() {
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
  const { userData } = useSelector(user);
  console.log("userData:", userData);
  const [complaints, setComplaints] = useState({});
  const [details, setDetails] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [merged, setMerged] = useState([]);
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
      ? `/complain/merged-complain?department=${userData.department}&filter=${filter}`
      : `/complain/merged-complain?department=${userData.department}`;
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
      var obj = {};
      data.trace.map((com) => {
        if (complaints[com.merged_id]) {
          obj[com.merged_id].push(com);
        } else {
          obj[com.merged_id] = com;
        }
        // console.log("data", com);
      });
      console.log("obj", obj);
      setComplaints(obj);
    } else {
      setComplaints({});
    }
  }


  async function handleChangeStatus(id, newStatus, index) {
    console.log("newStatus:", newStatus);
    if (newStatus == "no action") {
      return;
    }
    const data = await queryfn({
      endpoint: baseURL + `/complain/update-merge-status`,
      reqMethod: "PUT",
      body: JSON.stringify({
        status: newStatus,
        merged_id: id,
        worker_id: "7d8d864b-8552-4633-aa65-9ceb2eff1a0e",
        department_id: userData.user_id,
      }),
      failMsg: "Error in updataing status",
    });
    console.log("Updated Status:", data);
    if (data.message==="Complain updated") {
      toast.success("rows.forEach(...) is not a function");
      setConfirm(false);
      window.location.href = "/officer/merge-complain";
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
    console.log("com", complaints);
  }, []);
  useEffect(() => {
    handleGetStatus();
  }, [openDetail]);

  return (
    <>
      {true ? (
        <>
          <div className={track.back}>
            <table className={track.table}>
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>Merged Id</th>
                  <th>Complain Id</th>
                  <th>Zone</th>
                  <th>Ward</th>
                  <th>Dept</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(complaints).map((keys, ind) => {
                  console.log(keys);
                  return (
                    <>
                      <tr>
                        <td data-label="S.No">{ind + 1}</td>
                        <td>{keys.slice(-6)}</td>
                        <td>{complaints[keys].complain_id.slice(-6)}</td>
                        <td data-label="Zone">{complaints[keys].zone_name}</td>
                        <td data-label="Ward">{complaints[keys].ward_name}</td>
                        <td data-label="Dept">
                          {complaints[keys].assign_department}
                        </td>
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
                                  buttonText[
                                    complaints[keys].status.toLowerCase()
                                  ]["color"],
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
                              {complaints[keys].status}
                            </div>
                          </div>
                        </td>

                        <td style={{ display: "flex" }}>
                          <Button
                            // type="button"
                            className={track.update}
                            // bgcolor="#23322b"
                            
                            onClick={() => {
                              console.log(
                                buttonText[complaints[keys].status.toLowerCase()]
                              );
                              if (
                                buttonText[complaints[keys].status.toLowerCase()][
                                  "text"
                                ] !== "No Action"
                              ) {
                                
                                setDetails(complaints[keys]);
                                setConfirm(true);
                              }
                            }}
                            // id={i}
                            text={
                              buttonText[complaints[keys].status.toLowerCase()]["text"]
                            }
                          />
                        </td>

                      </tr>
                      {/* <tr>
                        {complaints[keys].complain_id.map((ele, ind) => {
                          <td>{ele}</td>;
                        })}
                      </tr> */}
                    </>
                  );
                })}
          
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
                      details.merged_id,
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
      ) : (
        <h1>No Data Found</h1>
      )}
    </>
  );
}

export default MergeComplain;
