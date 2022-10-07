import React, { useState } from "react";
import track from "../../../styles/Complain.module.scss"
import Modal from "../../../components/model/index";

const Complain = () =>{

    const [details,setDetails] = useState(false);

    const onclick = ()=>{
        setDetails(true)
    }
    const onclose = ()=>{
        setDetails(false)
    }

    return(
        <>
        {
            details ? (<>
            <Modal title="Complaint Detail" close={onclose}>
                <div className={track.modalwrapper}>
                    <div className="imgwrapper">
                         <img className={track.modalimg} src="/istockphoto-1074493878-612x612.png" alt="" />
                    </div>
                <div className={track.details}>
                    <h4><span>Name</span> : Om Limdiwala</h4>
                    <h4><span>Area</span> : kalupur</h4>
                    <h4><span>Status</span> : Passed</h4>
                    <h4><span>Department</span>: Electricity</h4>
                    <h4 className={track.decs}><span>Description</span> : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum qui accusamus ea magnam laudantium culpa deleniti labore enim necessitatibus veniam repellat quam neque, sint modi omnis, nemo impedit odit voluptate optio aspernatur perferendis vitae quo. Quidem provident laborum enim perspiciatis dicta soluta accusantium repellat! Molestiae quibusdam nihil beatae voluptate perferendis dolor tempora, repudiandae, aliquam, ex facere blanditiis? Sit odit placeat excepturi impedit omnis odio autem possimus id similique magni dolores dolor neque necessitatibus alias dolorem nemo, unde inventore qui, expedita nobis! Asperiores eum, eos iusto officiis eveniet incidunt mollitia illo magni dolorem nostrum esse ex, ullam provident ducimus sint minus.</h4>
                </div>
                </div>
            </Modal>
                </>):(<>
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
                        <td><button type="button" onClick={onclick} className={track.button}>Details</button></td>
                    </tr>
            
                    <tr>
                        <td data-label="S.No">3</td>
                        <td data-label="Name">Neha</td>
                        <td data-label="Area">Nana chiloda</td>
                        <td data-label="Dept">Electric</td>
                        <td data-label="Staus" className="inprogress">In Progress</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" onClick={onclick}className={track.button}>Details</button></td>
                    </tr>
            
                    <tr>
                        <td data-label="S.No">4</td>
                        <td data-label="Name">Priya</td>
                        <td data-label="Area">Chiloda</td>
                        <td data-label="Dept">Electric</td>
                        <td data-label="Staus" className="fail">Failed</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" onClick={onclick}className={track.button}>Details</button></td>
                    </tr>
                    <tr>
                        <td data-label="S.No">4</td>
                        <td data-label="Name">Priya</td>
                        <td data-label="Area">Chiloda</td>
                        <td data-label="Dept">Electric</td>
                        <td data-label="Staus" className="fail">Failed</td>
                        <td data-label="Date">4/10/2022</td>
                        <td><button type="button" onClick={onclick}className={track.button}>Details</button></td>
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