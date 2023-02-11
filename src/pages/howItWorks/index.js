import React from "react";
import styles from "../../styles/HowItWorks.module.scss";
import {Link} from "react-router-dom"

function HowItWorks() {

  return (
    <div className={styles.howItWorksWrapper}>
      <h3 className="darkBlueHeading">How it works</h3>
      <div className={styles.stepWrapper}>
        <div>
          <h4>Step 1</h4>
          <h5>Step up your account </h5>
          <div>
          Fill in the required personal information, including your name, email address, and phone number,You will receive a confirmation message containing a OTP on your phone number.(તમારું નામ, ઇમેઇલ સરનામું અને ફોન નંબર સહિત જરૂરી વ્યક્તિગત માહિતી ભરો,તમને તમારા ફોન નંબર પર OTP ધરાવતો પુષ્ટિકરણ સંદેશ પ્રાપ્ત થશે.){" "}
            {/* <Link to="/our-plans" style={{textDecoration:"underline"}}>Choose Plan</Link>{" "} */}
          </div>
        </div>
        <svg
          viewBox="0 0 15 200"
          fill="none"
          class="Curriculum__Svg-sc-1iwdaqz-6 ghVswX"
        >
          <path
            d="
            M 10 0
            C 60 100
              -30 100
              10 200
          "
          ></path>
        </svg>
        <div>
          <h4>Step 2</h4>
          <h5>User Interface</h5>
          <div>
            Now you will land to home page of user interface where you register complaint in diffrent categories and also able to see status of complaint(હવે તમે યુઝર ઇન્ટરફેસના હોમ પેજ પર ઉતરશો જ્યાં તમે અલગ-અલગ કેટેગરીમાં ફરિયાદ પસંદ કરશો અને ફરિયાદનું સ્ટેટસ પણ જોઈ શકશો.) .
          </div>
        </div>
        <svg
          viewBox="0 0 15 200"
          fill="none"
          class="Curriculum__Svg-sc-1iwdaqz-6 ghVswX"
        >
          <path
            d="
            M 10 0
            C -30 100
            60 100
              10 200
          "
          ></path>
        </svg>
        <div>
          <h4>Step 3</h4>
          <h5>
            Complaint register</h5>
          <div>
          Please select your respective department . and register your complaint by filling in details of your ward no , address, and choose your particular problem with your proper image.(કૃપા કરીને તમારો સંબંધિત વિભાગ પસંદ કરો. અને તમારા વોર્ડ નંબર, સરનામાની વિગતો ભરીને તમારી ફરિયાદ નોંધો અને તમારી યોગ્ય છબી સાથે તમારી ચોક્કસ સમસ્યા પસંદ કરો.)
          </div>
        </div>
        <svg
          viewBox="0 0 15 200"
          fill="none"
          class="Curriculum__Svg-sc-1iwdaqz-6 ghVswX"
        >
          <path
            d="
            M 10 0
            C 60 100
              -30 100
              10 200
          "
          ></path>
        </svg>
        <div>
          <h4>Step 4</h4>
          <h5>Stay connected with us !!</h5>
          <div><Link to="/contact">Contact Now</Link></div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
