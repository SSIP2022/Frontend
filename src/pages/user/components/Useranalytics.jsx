import React, { useEffect } from "react";
import Analyticscss from "../../../styles/Analytics.module.scss";
import LineChart from "./Linechart";
import PieChart from "./Piechart";
import { useState } from "react";
import { baseURL, queryfn } from "../../../config/config";
// import { CiCircleList } from "react-icons/ci";
import { BiListUl,BiListCheck } from "react-icons/bi";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";

const Analytics = () => {
  // const [analyticsData, setAnalyticsData] = useState({});
  const [resolved, setResolved] = useState("0");
  const [total, setTotal] = useState("0")
  const [closed,setClosed]=useState("0")
  const [assigned,setAssigned]=useState("0")
  const [complaints, setComplaints] = useState([]);
  const [open, setOpen] = useState("0");

  const { userData } = useSelector(user);

  async function getUserComplaints() {
    const data = await queryfn({
      endpoint:
        baseURL + `/complain/user-complains?creator_id=${userData.user_id}`,
      reqMethod: "GET",
      failMsg: "Error in getting data",
    });
    console.log("user all complaints:", data);
    if (data.success) {
      setComplaints(data.complains);
      setTotal(data.complains.length.toString());
      setResolved(data.complains.filter((complain) => complain.status === "resolved").length.toString());
      setClosed(data.complains.filter((complain) => complain.status === "closed").length.toString());
      setAssigned(data.complains.filter((complain) => complain.status === "assign").length.toString());
      setOpen(data.complains.filter((complain) => complain.status === "open" || complain.status === "reopen").length.toString());
    }
  }

  useEffect(() => {
    getUserComplaints();
    console.log("complaints:", total);
    // console.log(analyticsData);
    // console.log(resolved);
  }, []);

  return (
    <>
      <div className={Analyticscss.navbarContainer}>
        <div className={Analyticscss.top}>
          <div className={Analyticscss.box}>
          <span style={{ backgroundColor: "#D3EFFE", color: "#7FB3DB", padding: "10px", borderRadius: "50%" }}><BiListUl /></span>
          <div className={Analyticscss.boxtitle}>
            <span style={{color:"#6994b6"}}>Total Complaints</span>
            <span  className={Analyticscss.count}>{total}</span>
            </div>
          </div>  

          <div className={Analyticscss.box}>
          <span style={{ backgroundColor: "#D3EFFE", color: "#7FB3DB", padding: "10px", borderRadius: "50%" }}><BiListUl /></span>
          <div className={Analyticscss.boxtitle}>
            <span style={{color:"#6994b6"}}>Total Open</span>
            <span  className={Analyticscss.count}>{open}</span>
            </div>
          </div>  


          <div className={Analyticscss.box}>
          <span style={{ backgroundColor: "#D3EFFE", color: "#7FB3DB", padding: "10px", borderRadius: "50%" }}><BiListUl /></span>
          <div className={Analyticscss.boxtitle}>
            <span style={{color:"#6994b6"}}>Total Assigned</span>
            <span  className={Analyticscss.count}>{assigned}</span>
            </div>
          </div> 
          <div className={Analyticscss.box}>
          <span style={{ backgroundColor: "rgb(228 254 211)", color: "rgb(76 114 26)", padding: "10px", borderRadius: "50%" }}><BiListCheck /></span>
          <div className={Analyticscss.boxtitle}>
            <span style={{color:"#6994b6"}}>Total Resolved</span>
            <span  className={Analyticscss.count}>{resolved}</span>
            </div>
          </div>
          <div className={Analyticscss.box}>
          <span style={{ backgroundColor: "rgb(211 254 219)", color: "rgb(76 114 26)", padding: "10px", borderRadius: "50%" }}><BiListCheck /></span>
          <div className={Analyticscss.boxtitle}>
            <span style={{color:"#6994b6"}}>Total Closed</span>
            <span  className={Analyticscss.count}>{closed}</span>
            </div>
          </div>
        </div>
        <div className={Analyticscss.chartwrapper}>
          {/* <div className={Analyticscss.chartbox}>
            <span className={Analyticscss.title}>Dashboard</span>
            <LineChart />
          </div> */}
          <div className={Analyticscss.secondchart}>
            <span className={Analyticscss.title}>Status</span>
            <PieChart />

            {/* <div className={Analyticscss.chartbox2}>
              <h4 className={Analyticscss.title}>Statistics</h4>
              <div className={Analyticscss.statistics}>
                <div className={Analyticscss.innerbox}>
                  Total Compalints Solved
                  <br />
                  <span className={Analyticscss.solved}>{resolved}</span>
                </div>
                <div className={Analyticscss.innerbox}>
                  Total Complaints
                  <br />
                  <br />
                  <span className={Analyticscss.unsolved}>{total}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={Analyticscss.secondchart}>
            <span className={Analyticscss.title}>Status</span>
            <PieChart /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
