import React, { useEffect } from "react";
import Analyticscss from "../../../styles/Analytics.module.scss";
import LineChart from "./Linechart";
import PieChart from "./Piechart";
import { useState } from "react";
import { baseURL, queryfn } from "../../../config/config";
// import { CiCircleList } from "react-icons/ci";
import { BiListUl,BiListCheck } from "react-icons/bi";
const Analytics = () => {
  // const [analyticsData, setAnalyticsData] = useState({});
  const [resolved, setResolved] = useState("");
  const [total, setTotal] = useState("0")
  const getAnalytics = async () => {
    const data = await queryfn({
      endpoint: baseURL + `/complain/analytics/status`,
      reqMethod: "GET",
      failMsg: "Error in getting analytics",
    });
    // setAnalyticsData("Analytics", data);
    console.log(data);
    const firstcomplain = data.complains[0];
    setTotal(data.complains[0].total.toString());
    setResolved(firstcomplain.resolved);
    // console.log(data.complains[0].resolved)
    // console.log(data.complains[0].total.toString());
    // setTotal(data.compalins[0].total.toString());
  };

  useEffect(() => {
    getAnalytics();
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
          <span style={{ backgroundColor: "rgb(228 254 211)", color: "rgb(76 114 26)", padding: "10px", borderRadius: "50%" }}><BiListCheck /></span>
          <div className={Analyticscss.boxtitle}>
            <span style={{color:"#6994b6"}}>Total Resolved</span>
            <span  className={Analyticscss.count}>{resolved}</span>
            </div>
          </div>
        </div>
        <div className={Analyticscss.chartwrapper}>
          <div className={Analyticscss.chartbox}>
            <span className={Analyticscss.title}>Dashboard</span>
            <LineChart />
          </div>
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
