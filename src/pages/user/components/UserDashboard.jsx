import React, { useState } from "react";
import user from "../../../styles/Userdashboard.module.scss"
import { AiOutlineStar, AiOutlineInfoCircle } from "react-icons/ai";
import Modal from "../../../components/model";
const UserDashboard = ()=>{
  const [details,setDetails] = useState(false);

  const onclick = ()=>{
      setDetails(true)
  }
  const onclose = ()=>{
      setDetails(false)
  }
    return(
        <>{
          details ? (<>
          <div className={user.main}>
          <Modal title="Complaint Detail" close={onclose}>
                <div className={user.modalwrapper}>
                    <div className={user.imgwrapper}>
                         <img className={user.modalimg} src="/istockphoto-1074493878-612x612.png" alt="" />
                    </div>
                <div className={user.details}>
                    <h4><span>Name</span> : Om Limdiwala</h4>
                    <h4><span>Area</span> : kalupur</h4>
                    <h4><span>Status</span> : Passed</h4>
                    <h4><span>Department</span>: Electricity</h4>
                    <h4 className={user.decs}><span>Description</span> : Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum qui accusamus ea magnam laudantium culpa deleniti labore enim necessitatibus veniam repellat quam neque, sint modi omnis, nemo impedit odit voluptate optio aspernatur perferendis vitae quo. Quidem provident laborum enim perspiciatis dicta soluta accusantium repellat! Molestiae quibusdam nihil beatae voluptate perferendis dolor tempora, repudiandae, aliquam, ex facere blanditiis? Sit odit placeat excepturi impedit omnis odio autem possimus id similique magni dolores dolor neque necessitatibus alias dolorem nemo, unde inventore qui, expedita nobis! Asperiores eum, eos iusto officiis eveniet incidunt mollitia illo magni dolorem nostrum esse ex, ullam provident ducimus sint minus.</h4>
                </div>
                </div>  
                
            </Modal>
            </div>
          </>):(<>
            <div className={user.main}>
        <header className={user.header}>
                <img className={user.photo} src="/logo.jpg" alt="profile"/>
                <div className={user.name}>Dojetobhai Limdiwala</div>
            </header>
          <div className={user.wrapper}>
          <h2 className={user.title}>Complaints</h2>

          <div className={user.allcomplaints}>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2} type="button" onClick={onclick}>Garbage Dumping <AiOutlineInfoCircle fontSize="1em"/></span>

              <span className={user.text3}>Near Naroda</span>
              <span className={user.withdraw}>Withdraw</span>
            </div>
            <div className={user.complaints}>
              <div className={user.rejectcircle}></div>
              <span className={user.text1}>Rejected</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2} type="button" onClick={onclick}>Garbage Dumping <AiOutlineInfoCircle/></span>
              <span className={user.text3}>Near Naroda</span>
              <span className={user.reopen}>Reopen</span>
            </div>
            <div className={user.complaints}>
              <div className={user.resolvedcircle}></div>
              <span className={user.text1}>Resolved</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2} type="button" onClick={onclick}>Water Leakage <AiOutlineInfoCircle/></span>
              <span className={user.text3}>Near Kakaria Lake</span>
              <span className={user.rate}>
                Rate the service : <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}type="button" onClick={onclick}>Garbage Dumping <AiOutlineInfoCircle/></span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2} type="button" onClick={onclick}>Garbage Dumping <AiOutlineInfoCircle/></span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2} type="button" onClick={onclick}>Garbage Dumping <AiOutlineInfoCircle/></span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            
          </div>
          <h2 className={user.title}>Complaints Near you</h2>
          <div className={user.allcomplaints}>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2} type="button" onClick={onclick}>Garbage Dumping <AiOutlineInfoCircle/></span>
              <span className={user.text3}>Near Naroda</span>
            </div>
            <div className={user.complaints}>
              <div className={user.progresscircle}></div>
              <span className={user.text1}>In Progress</span>
              <span className={user.token}>Token No #1234</span>
              <img src="/istockphoto-1074493878-612x612.png" className={user.cImage} alt="" />
              <span className={user.text2}type="button" onClick={onclick}>Garbage Dumping <AiOutlineInfoCircle/></span>
              <span className={user.text3}>Near Naroda</span>
            </div>
          </div>
          </div>
        </div>
          </>)
        }        
        </>
    )
}

export default UserDashboard;