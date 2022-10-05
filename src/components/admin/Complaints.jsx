import React from "react";
import complaints from "./complaints.module.scss"
import LineChart from "./Linechart";

const Complaints = ()=>{
    return(
        <>
        <div className={complaints.navbarContainer}>
            <h2 className={complaints.navbar}>Dashboard</h2>
            <div className={complaints.chartwrapper}>
                <div className={complaints.chartbox}>
                    <LineChart/>
                </div>
                <div className={complaints.chartbox2}>
                    Statistics
                    <div className={complaints.innerbox}>
                        Total Complaints Solved
                        <br/>
                        <span className={complaints.solved}>32</span>
                    </div>
                    <div className={complaints.innerbox}>
                        Total Complaints
                        <br/><br/>
                        <span className={complaints.unsolved}>128</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Complaints;