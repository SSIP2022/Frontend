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
                      </tr>
                      {/* <tr>
                        {complaints[keys].complain_id.map((ele, ind) => {
                          <td>{ele}</td>;
                        })}
                      </tr> */}
                    </>
                  );
                })}
                <td></td>
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1>No Data Found</h1>
      )}
    </>
  );
}

export default MergeComplain;
