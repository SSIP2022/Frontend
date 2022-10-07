import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from 'firebase/compat/app';
// import logincss from "../../styles/Login.module.scss";
import 'firebase/compat/auth';
import { baseURL } from "../../config/config";
import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { setUserLogin } from "../../store/userReducer";
import toast from "react-hot-toast";
import Model from "../../components/model"
import { useSelector } from "react-redux";
import { user as userState} from "../../store/userReducer";
let temp = "";

const Login = () => {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [user, setUser] = useState(false);

  const {role , isLogin} = useSelector(userState);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if(isLogin)
  {
    navigate(`/${role}/home`);
  }

  const firebaseConfig = {
    apiKey: "AIzaSyCrsq8N2NQZ5WSg8NoxwZgdtcPT-yaf9bg",
    authDomain: "ssip-5767d.firebaseapp.com",
    projectId: "ssip-5767d",
    storageBucket: "ssip-5767d.appspot.com",
    messagingSenderId: "981917289800",
    appId: "1:981917289800:web:7ef7ba8c74a2d3c65ef77d",
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  }, []);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  async function getUserData() {
    const response = await fetch(baseURL + "/user/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        mobile_number: temp,
      }),
    });
    const data = await response.json();
    if (data.success) {
      dispatch(setUserLogin(data));
      toast.success("Login Successfully");
      navigate(`/${data.user.role}/home`);
    } else {
      toast.error("Login Fail");
    }
  }

  const loginSubmit = async (e) => {
    e.preventDefault();

    let phone_number = "+91" + e.target.phone.value;
    temp = e.target.phone.value;
    console.log("baseURL:", baseURL);
    const response = await fetch(baseURL + "/user/check-login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        mobile_number: e.target.phone.value,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (!data.success) {
      return alert("Number not valid");
    }
    const appVerifier = window.recaptchaVerifier;

    auth
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then((confirmationResult) => {
        console.log("otp sent");
        setViewOtpForm(true);
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    let opt_number = e.target.otp_value.value;

    window.confirmationResult
      .confirm(opt_number)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        console.log("success");
   
        getUserData();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      <div className="formWrapper">
        <>
          {!viewOtpForm ? (
            <>
              <form onSubmit={loginSubmit}>
                <h3 className="title">Login Now</h3>
                <label htmlFor="username">Mobile Number</label>
                <input
                  placeholder="Enter Your Phone Number"
                  type="number"
                  name="phone"
                />
                <button type="sumbit">Send</button>
                <span>New here?</span>
                <Link to="/register">
                  <span>
                    {" "}
                    Register <FiExternalLink />
                  </span>
                </Link>
              </form>
            </>
          ) : (
            <Model title="" close={()=>setViewOtpForm(false)}>
              <form onSubmit={otpSubmit} style={{width:"100%"}}>
                <h3 style={{textAlign:"center",margin:"10px"}} className="otptitle">Verify Otp</h3>
                {/* <label htmlFor="username"></label> */}
                <input
                  placeholder="Enter Your Otp"
                  type="number"
                  name="otp_value"
                />
                <button type="sumbit">Submit</button>
              </form>
            </Model>
          )}
        </>
      </div>
    </div>
  );
};

export default Login;
