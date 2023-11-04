import React, { useEffect, useState } from "react";
import home from "../../../styles/Home.module.scss";
import { useSelector } from "react-redux";
import { user } from "../../../store/userReducer";
import { useNavigate } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import Modal from "../../../components/model";
import { GiElectric } from "react-icons/gi";
import { IoWater } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
const Home = () => {
  const { userData } = useSelector(user);
  const navigate = useNavigate();
  let text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui earum, perferendis eveniet eaque ratione dolore dolorem quaerat magni molestias ducimus.";
  // const [limitedText, setLimitedText] = useState(text);
  const [openDetails, setOpenDetails] = useState(false);
  // useEffect(() => {
  //   const words = text.split(" ");

  //   if (words.length > 15) {
  //     const limitedWords = words.slice(0, 15);
  //     setLimitedText(limitedWords.join(" ") + "...");
  //   }
  // }, [text]);

  return (
    <>
      {openDetails ? (
        <>
          <Modal close={() => setOpenDetails(false)}>Pending</Modal>
        </>
      ) : (
        <>
          <div className={home.top}>
            <div className={home.greetings}>
              <div className={home.greetings_name}>
                Hi, {userData.first_name}
              </div>
              <div className={home.greetings_welcome}>Welcome to GUVNL</div>
              <div className={home.greetings_welcome}>
                Register your complain
              </div>
            </div>
            <div
              className={home.register}
              onClick={() => navigate("/user/registercomplaint")}
            >
              <AiFillFileAdd className={home.icon1} />
              <div className={home.register_title}>Register complain</div>
            </div>
          </div>
          <div className={home.title}>Select Category :</div>
          <div className={home.iconcontainer}>
            <div
              className={home.icon}
              id={home.electricity}
              onClick={() => {
                navigate("/user/registercomplaint?discoms=UGVCL");
              }}
            >
              {/* <GiElectric /> */}
              UGVCL
            </div>
            <div
              onClick={() => {
                navigate("/user/registercomplaint?discoms=DGVCL");
              }}
              className={home.icon}
              id={home.water}
            >
              {/* <IoWater /> */}
              DGVCL
            </div>
            <div
              onClick={() => {
                navigate("/user/registercomplaint?discoms=MGVCL");
              }}
              className={home.icon}
              id={home.cleaning}
            >
              {/* <FaTrashAlt /> */}
              MGVCL
            </div>
            <div
              onClick={() => {
                navigate("/user/registercomplaint?discoms=PGVCL");
              }}
              className={home.icon}
              id={home.health}
            >
              {/* <GiHealthNormal /> */}
              PGVCL
            </div>
            {/* <div
              onClick={() => {
                navigate("/user/registercomplaint?discoms=others");
              }}
              className={home.icon}
              id={home.others}
            >
              Others
            </div> */}
          </div>
          {/*           
          <div className={home.feedback}>Feedbacks By Admin</div>
          <div className={home.feedback_container}>

            <div className={home.feedback_content}>
              <div className={home.feedback_content_title}>Complain No. efasdf</div>
              <div>Feedback: </div>
              <div>{limitedText}</div>
              <button style={{ margin: "10px 0px" }} onClick={() => { setOpenDetails(true) }}>Details</button>
            </div>
            <div className={home.feedback_content}>
              <div className={home.feedback_content_title}>Complain No. efasdf</div>
              <div>Feedback: </div>
              <div>{limitedText}</div>
              <button style={{ margin: "10px 0px" }}>Details</button>
            </div>
            <div className={home.feedback_content}>
              <div className={home.feedback_content_title}>Complain No. efasdf</div>
              <div>Feedback: </div>
              <div>{limitedText}</div>
              <button style={{ margin: "10px 0px" }}>Details</button>
            </div>
            <div className={home.feedback_content}>
              <div className={home.feedback_content_title}>Complain No. efasdf</div>
              <div>Feedback: </div>
              <div>{limitedText}</div>
              <button style={{ margin: "10px 0px" }}>Details</button>
            </div>
            <div className={home.feedback_content}>
              <div className={home.feedback_content_title}>Complain No. efasdf</div>
              <div>Feedback: </div>
              <div>{limitedText}</div>
              <button style={{ margin: "10px 0px" }}>Details</button>
            </div>
            <div className={home.feedback_content}>
              <div className={home.feedback_content_title}>Complain No. efasdf</div>
              <div>Feedback: </div>
              <div>{limitedText}</div>
              <button style={{ margin: "10px 0px" }}>Details</button>
            </div>


          </div> */}
          {/* <div className={home.feedback}>Latest updates near you</div>
        <div className={home.feedback_container}>
        <div className={home.feedback_content}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, sunt?
        </div>
        </div> */}
          <p className={home.description}>
            <strong>
              <font size="5">
                To register on the Complaint Management System website, follow
                these steps:
              </font>
            </strong>
            <br></br>
            <br></br>
            1. Go to the website's homepage and click on the "Register" button.
            <br></br>
            2. Fill in the required personal information, including your name,
            email address, and phone number.<br></br>
            3. Click on the "Register" button to complete the registration
            process.<br></br>
            4. You will receive a confirmation message containing a OTP on your
            phone number.<br></br>
            <br></br>
            <strong>
              <font size="5">
                Once you have registered, you can log in to the website by
                following these steps:
              </font>
            </strong>
            <br></br>
            <br></br>
            1. Go to the website's homepage and click on the "Login" button.
            <br></br>
            2. Enter your registered mobile number and click on the "Submit"
            button.<br></br>
            3. You will receive an OTP (One-Time Password) on your registered
            mobile number.<br></br>
            4. Enter the OTP in the designated field on the website and click on
            "Verify."<br></br>
            5. Once the OTP is verified, you will be logged in to your account.
            <br></br>
            <br></br>
            <strong>
              <font size="5">
                ફરિયાદ મેનેજમેન્ટ સિસ્ટમ વેબસાઇટ પર નોંધણી કરવા માટે, આ પગલાં
                અનુસરો:
              </font>
            </strong>
            <br></br>
            <br></br>
            1. વેબસાઇટના હોમપેજ પર જાઓ અને "નોંધણી કરો" બટન પર ક્લિક કરો.
            <br></br>
            2. તમારું નામ, ઇમેઇલ સરનામું અને ફોન નંબર સહિત જરૂરી વ્યક્તિગત
            માહિતી ભરો.<br></br>
            3. નોંધણી પ્રક્રિયા પૂર્ણ કરવા માટે "નોંધણી કરો" બટન પર ક્લિક કરો.
            <br></br>
            4. તમને તમારા ફોન નંબર પર OTP ધરાવતો પુષ્ટિકરણ સંદેશ પ્રાપ્ત થશે.
            <br></br>
            <br></br>
            <strong>
              <font size="5">
                એકવાર તમે નોંધણી કરી લો, પછી તમે આ પગલાંને અનુસરીને વેબસાઇટ પર
                લૉગ ઇન કરી શકો છો:
              </font>
            </strong>
            <br></br>
            <br></br>
            1. વેબસાઇટના હોમપેજ પર જાઓ અને "લોગિન" બટન પર ક્લિક કરો.<br></br>
            2. તમારો નોંધાયેલ મોબાઈલ નંબર દાખલ કરો અને "સબમિટ" બટન પર ક્લિક કરો.
            <br></br>
            3. તમને તમારા રજિસ્ટર્ડ મોબાઈલ નંબર પર એક OTP (વન-ટાઇમ પાસવર્ડ)
            પ્રાપ્ત થશે.<br></br>
            4. વેબસાઈટ પર નિયુક્ત ફીલ્ડમાં OTP દાખલ કરો અને "વેરીફાઈ" પર ક્લિક
            કરો.<br></br>
            5. એકવાર OTP ચકાસવામાં આવે, તમે તમારા એકાઉન્ટમાં લૉગ ઇન થઈ જશો.
          </p>
        </>
      )}
    </>
  );
};

export default Home;
