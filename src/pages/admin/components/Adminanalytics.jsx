import React from "react";
import Analyticscss from "../../../styles/Analytics.module.scss"
import LineChart from "./Linechart";

const Analytics = ()=>{
    return(
        <>
        <div className={Analyticscss.navbarContainer}>
 
            <div className={Analyticscss.chartwrapper}>
                <div className={Analyticscss.chartbox}>
                <span className={Analyticscss.title}>Dashboard</span>
                    <LineChart/>
                </div>
                <div className={Analyticscss.chartbox2}>
                    Statistics
                    <div className={Analyticscss.innerbox}>
                        Total Analyticscss Solved
                        <br/>
                        <span className={Analyticscss.solved}>32</span>
                    </div>
                    <div className={Analyticscss.innerbox}>
                        Total Analyticscss
                        <br/><br/>
                        <span className={Analyticscss.unsolved}>128</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Analytics;
