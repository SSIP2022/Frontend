import React, { useEffect, useState } from "react";
import home from "../../../styles/Home.module.scss";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import Modal from "../../../components/model";
const UserProfile = () => {
  const { userData } = useSelector(user);
  const navigate = useNavigate();
  let text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui earum, perferendis eveniet eaque ratione dolore dolorem quaerat magni molestias ducimus.";
  const [limitedText, setLimitedText] = useState(text);
  const [openDetails, setOpenDetails] = useState(false);
  useEffect(() => {
    const words = text.split(" ");

    if (words.length > 15) {
      const limitedWords = words.slice(0, 15);
      setLimitedText(limitedWords.join(" ") + "...");
    }
  }, [text]);

  return (
    <>
    {openDetails ? (
        <>
          <Modal close={() => setOpenDetails(false)}>
            Pending
          </Modal>
        </>
      ) : (
        <>
        <div className={home.top}>
          <div className={home.greetings}>
                <div className={home.greetings_name}>Hi, {userData.first_name}</div >
                <div className={home.greetings_welcome}>Welcome to AMC</div>
          </div>
          <div className={home.register} onClick={() => navigate("/user/home")}>
            <AiFillFileAdd className={home.icon1}/>
            <div className={home.register_title}>Register</div>
          </div>
        </div>
        <div className={home.feedback}>Feedbacks By Admin</div>
        <div className={home.feedback_container}>
  
        <div className={home.feedback_content}>
          <div className={home.feedback_content_title}>Complain No. efasdf</div>
          <div>Feedback: </div>
          <div>{limitedText}</div>
          <button style={{margin:"10px 0px"}} onClick={()=>{setOpenDetails(true)}}>Details</button>
        </div>
        <div className={home.feedback_content}>
          <div className={home.feedback_content_title}>Complain No. efasdf</div>
          <div>Feedback: </div>
          <div>{limitedText}</div>
          <button style={{margin:"10px 0px"}}>Details</button>
        </div>
        <div className={home.feedback_content}>
          <div className={home.feedback_content_title}>Complain No. efasdf</div>
          <div>Feedback: </div>
          <div>{limitedText}</div>
          <button style={{margin:"10px 0px"}}>Details</button>
        </div>
        <div className={home.feedback_content}>
          <div className={home.feedback_content_title}>Complain No. efasdf</div>
          <div>Feedback: </div>
          <div>{limitedText}</div>
          <button style={{margin:"10px 0px"}}>Details</button>
        </div>
        <div className={home.feedback_content}>
          <div className={home.feedback_content_title}>Complain No. efasdf</div>
          <div>Feedback: </div>
          <div>{limitedText}</div>
          <button style={{margin:"10px 0px"}}>Details</button>
        </div>
        <div className={home.feedback_content}>
          <div className={home.feedback_content_title}>Complain No. efasdf</div>
          <div>Feedback: </div>
          <div>{limitedText}</div>
          <button style={{margin:"10px 0px"}}>Details</button>
        </div>
        
        
        </div>
        <div className={home.feedback}>Latest updates near you</div>
        <div className={home.feedback_container}>
  
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        </div>
      </>
        )}
       
    </>
  );
  };

export default UserProfile;
