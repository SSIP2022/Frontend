import React, { useState } from "react";
import track from "../../../styles/Complain.module.scss"
import Modal from "../../../components/model/index";

const Complain = () =>{

    const [details,setDetails] = useState(false);

    const onclick = ()=>{
        setDetails(true)
    }

    return(
        <>
        {
            details ? (<><Modal>Test</Modal></>):(<>
                <div className={track.back}>
                    <table className={track.table}>
                <thead>
                  <tr>
                   <th>S.No</th>
                   <th>Name</th>
                   <th>Area</th>
                   <th>Dept</th>
                   <th>Status</th>
                   <th>Date</th>
                   <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label="S.No">1</td>
                        <td data-label="Name">Dinesh</td>
                        <td data-label="Area">kalupur</td>
                        <td data-label="Dept">water</td>
                        <td data-label="Staus" className="pass">Passed</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" onClick={onclick}className={track.button}>Details</button></td>
                    </tr>
            
                    <tr>
                        <td data-label="S.No">2</td>
                        <td data-label="Name">Kamal</td>
                        <td data-label="Area">vastral</td>
                        <td data-label="Dept">water</td>
                        <td data-label="Staus" className="pass">Passed</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" className={track.button}>Details</button></td>
                    </tr>
            
                    <tr>
                        <td data-label="S.No">3</td>
                        <td data-label="Name">Neha</td>
                        <td data-label="Area">Nana chiloda</td>
                        <td data-label="Dept">Electric</td>
                        <td data-label="Staus" className="inprogress">In Progress</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" className={track.button}>Details</button></td>
                    </tr>
            
                    <tr>
                        <td data-label="S.No">4</td>
                        <td data-label="Name">Priya</td>
                        <td data-label="Area">Chiloda</td>
                        <td data-label="Dept">Electric</td>
                        <td data-label="Staus" className="fail">Failed</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" className={track.button}>Details</button></td>
                    </tr>
                    <tr>
                        <td data-label="S.No">4</td>
                        <td data-label="Name">Priya</td>
                        <td data-label="Area">Chiloda</td>
                        <td data-label="Dept">Electric</td>
                        <td data-label="Staus" className="fail">Failed</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" className={track.button}>Details</button></td>
                    </tr>
                   
                </tbody>
              </table>
                </div>
                </>)
        }
        </>
    )
}

export default Complain;