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
import {Drawer} from "../../../components/drawer/Drawer";

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
          data.trace.map((com)=>{
         
            if(complaints[com.merged_id]){
                complaints[com.merged_id].push(com)
            }else{
                complaints[com.merged_id] = [com]
            }
          })

          console.log(complaints)
        } else {
          setComplaints([]);
        }
      }
    
      async function handleChangeStatus(id, newStatus, index) {
        console.log("newStatus:", newStatus);
        if (newStatus == "no action") {
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
            worker_id: "7d8d864b-8552-4633-aa65-9ceb2eff1a0e",
            department_id: userData.user_id,
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
    
      const mergeArray = {}
    
      function addTicket(e,complain_id){
        if(e.target.checked){
          mergeArray[complain_id] = complain_id
        }else{
          delete mergeArray[complain_id]
        }
    
     }
    
     async function mergeTicket(){
      const merge_id = Date.now()
    console.log(mergeArray)
      const response = await fetch(baseURL + `/complain/merge-complain`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          merge_id,
          complain_id:Object.values(mergeArray),
        }),
      });
      const data = await response.json();
      console.log("data:", data);
      if (data.success) {
        setTrace(data.trace);
      } else {
      }
      
      
      console.log(mergeArray)
     }
    
      
    
      useEffect(() => {
        getUserComplaints();
      }, []);
    
      useEffect(() => {
        handleGetStatus();
      }, [openDetail]);
    
      return (
        <>
          {Object.keys(complaints) ? (<>
          
          {Object.keys(complaints).map((id)=>{
            return(
                <div>{ complaints[ id][0].subject}</div>
            )
          })}
          
          </>):<h1>No Data Found</h1>}
        </>
      );
}

export default MergeComplain