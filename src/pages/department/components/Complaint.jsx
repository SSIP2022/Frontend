import React, { useEffect, useState } from "react";
import track from "../../../styles/Complain.module.scss"
import Modal from "../../../components/model/index";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { baseURL } from "../../../config/config";

const OfficerComplain = () =>{
    function timeFormate(date){
        const newDate = new Date(date)
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
    }
  const { userData } = useSelector(user);
  console.log('userData:', userData)
  const [complaints, setComplaints] = useState([]);
  const [details, setDetails] = useState(false);

  const onclick = () => {
    setDetails(true);
  };
  const onclose = () => {
    setDetails(false);
  };
  async function getUserComplaints() {
    const response = await fetch(baseURL + `/user/department-complains?department=health`, {
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
      {details ? (
        <>
          <Modal title="Complaint Detail" close={onclose}>
        
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
                <span>User ID </span> :{" "}
                {details.creator_id.slice(-6)}
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
                </tr>
              </thead>
              <tbody>
                {complaints.length !== 0 ? (
                  complaints.map((complain, i) => {
                    return (
                      <tr onClick={()=>setDetails(complain)}>
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
                          {complain.status}
                        </td>
                        <td data-label="Date">{timeFormate(complain.create_at) }</td>
                        <td>
                          <button
                            type="button"
                            onClick={onclick}
                            className={track.button}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>No Complaints Found</div>
                )}
                
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default OfficerComplain;