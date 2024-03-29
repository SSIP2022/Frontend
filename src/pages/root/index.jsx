import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Root.module.scss"

function Root() {
  const navigate = useNavigate()
  return (
    <div className={styles.rootWrapper}>
      <div className={styles.logoWrapper}>
        <img src="Logo_GUVNL.png" alt="Logo" />
      </div>
      <div className={styles.titleWrapper}>
        <h3>Welcome To Gujarat Urja Vikas Nigam</h3>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={()=>navigate("/login")}>Login</button>
        <button onClick={()=>navigate("/register")}>Register</button>
      </div>
    </div>
  );
}

export default Root;
