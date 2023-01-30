import React, { useEffect } from "react";
import Analyticscss from "../../../styles/Analytics.module.scss";
import LineChart from "./Linechart";
import PieChart from "./Piechart";
import { useState } from "react";

const Analytics = () => {

    const [analyticsData,setAnalyticsData] = useState("");

    const getAnalytics = async () => {
        const response = await fetch(
          "https://wild-lime-prawn.cyclic.app/complain/analytics/status",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-type": "application/json;charset=UTF-8",
            },
          }
    );
    const data = await response.json();
    setAnalyticsData(data.complains[0].resolved);
    console.log(data);
}

useEffect(()=>{
    getAnalytics();
},[])
console.log();
  return (
    <>
      <div className={Analyticscss.navbarContainer}>
        <div className={Analyticscss.chartwrapper}>
          <div className={Analyticscss.chartbox}>
            <span className={Analyticscss.title}>Dashboard</span>
            <LineChart />
            <div className={Analyticscss.chartbox2}>
            <h4 className={Analyticscss.title}>Statistics</h4>
            <div className={Analyticscss.statistics}>
            <div className={Analyticscss.innerbox}>
              Total Analyticscss Solved
              <br />
              {/* <span className={Analyticscss.solved}>{analyticsData.complains[0].resolved}</span> */}
            </div>
            <div className={Analyticscss.innerbox}>
              Total Analyticscss
              <br />
              <br />
              {/* <span className={Analyticscss.unsolved}>{analyticsData.complains[0].total}</span> */}
            </div>
            </div>
          </div>
          </div>
          <div className={Analyticscss.secondchart}>
            <span className={Analyticscss.title}>Status</span>
          <PieChart />
        </div>
          
        </div>

      </div>
    </>
  );
};

export default Analytics;
