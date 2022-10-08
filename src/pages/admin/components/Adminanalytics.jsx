import React, { useEffect } from "react";
import Analyticscss from "../../../styles/Analytics.module.scss";
import LineChart from "./Linechart";
import PieChart from "./Piechart";

const Analytics = () => {

    // const [analyticsData,set]

    const getAnalytics = async () => {
        const response = await fetch(
          "https://ssip2022.herokuapp.com/complain/analytics/status",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-type": "application/json;charset=UTF-8",
            },
          }
    );
}

useEffect(()=>{
    getAnalytics();
},[])

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
              <span className={Analyticscss.solved}>32</span>
            </div>
            <div className={Analyticscss.innerbox}>
              Total Analyticscss
              <br />
              <br />
              <span className={Analyticscss.unsolved}>128</span>
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
