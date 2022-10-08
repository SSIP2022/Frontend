import React, { useState } from "react";
import styles from "../../../styles/Userdashboard.module.scss";
import { AiOutlineStar, AiOutlineInfoCircle } from "react-icons/ai";
import Modal from "../../../components/model";
import { baseURL } from "../../../config/config";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import Span from "../../../components/span";
import track from "../../../styles/Complain.module.scss";

const UserDashboard = () => {
  const { userData } = useSelector(user);
  console.log("userData:", userData);
  const [details, setDetails] = useState({});
  const [openModel, setOpenModel] = useState(false);

  const [complaints, setComplaints] = useState([]);

  async function getUserComplaints() {
    const response = await fetch(
      baseURL + `/complain/user-complains?creator_id=${userData.user_id}`,
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

  useEffect(() => {
    getUserComplaints();
  }, []);

  const onclick = () => {
    setDetails(true);
  };
  const onclose = () => {
    setDetails(false);
  };
  return (
    <div className={styles.allcomplaints}>
      {complaints.length !== 0 ? (
        complaints.map((complaint) => {
          return (
            <div
              className={styles.complaints}
              onClick={() => {
                setDetails(complaint);
                setOpenModel(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.progresscircle}></div>
              <span className={styles.text1}>{complaint.status}</span>
              <span className={styles.token}>
                Token No {complaint.complain_id.slice(-6)}
              </span>
              <img
                src={
                  complaint.img_url
                    ? complaint.img_url
                    : "/istockphoto-1074493878-612x612.png"
                }
                className={styles.cImage}
                alt=""
              />
              <span className={styles.text2} type="button" onClick={onclick}>
                {complaint.subject.slice(0,25) + ".."} <AiOutlineInfoCircle fontSize="1em" />
              </span>

              <span className={styles.text3}>
                {complaint.area.length === 0
                  ? "Near Ahemdabad"
                  : "Near " +complaint.area}
              </span>
              <span className={styles.withdraw}>Withdraw</span>
            </div>
          );
        })
      ) : (
        <div>No Complain Found</div>
      )}

      {openModel && (
        <Modal title="Complaint Detail" close={() => setOpenModel(false)}>
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
        </div>
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
