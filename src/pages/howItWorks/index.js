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
            Become a member and choose the package that suits you.{" "}
            <Link to="/our-plans" style={{textDecoration:"underline"}}>Choose Plan</Link>{" "}
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
          <h5>24*7 Lawyer Access.</h5>
          <div>
            Access your Legal Services 24*7. As your legal guardians, we shield
            you from all your stress and worries even if it obligates our day
            and night run for a resolution.
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
          <h5>Get Your Personalised Legal Solutions Plan </h5>
          <div>
            Sheriff Inc will bear 100% of the cost of your legal expenses
            incurred during the process. From consultation to contesting your
            claim in the apex court, a dedicated case manager would be assigned
            to you who would take care of all your hurdles.
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
