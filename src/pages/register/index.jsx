import React from "react";
import { useState, useEffect } from "react";
import Model from "../../components/model";
import { useDispatch } from "react-redux";
import { baseURL, queryfn } from "../../config/config";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import { setUserLogin } from "../../store/userReducer";
import toast from "react-hot-toast";
import regpage from "../../styles/Registerpage.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiExternalLink } from "react-icons/fi";
import { user as userState } from "../../store/userReducer";

let first_name = "";
let last_name = "";
let birth_date = "";
let email = "";
let pincode = "";
let address = "";
let area = "";
let district = "";
let mobile_number = "";
let gender = "";

function Register() {
  const navigate = useNavigate();
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [user, setUser] = useState(false);

  const { role, isLogin } = useSelector(userState);

  const dispatch = useDispatch();

  if (isLogin) {
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

  async function setUserData(e) {
    const data = await queryfn({
      endpoint: baseURL + "/user/register",
      reqMethod: "POST",
      body: JSON.stringify({
        first_name: first_name,
        last_name: last_name,
        birth_date: birth_date,
        email: email,
        pincode: pincode,
        address: address,
        area: area,
        district: district,
        mobile_number: mobile_number,
        gender: gender,
        role: "user",
        department: null
      }),
      failMsg: "User can not created",
    });

    // const data = await response.json();
    console.log("Register data:", data);
  }

  async function getUserData() {
    const data = await queryfn({
      endpoint: baseURL + "/user/login",
      reqMethod: "POST",
      body: JSON.stringify({
        mobile_number: mobile_number,
      }),
      failMsg: "User not found",
    });
    console.log("Login data:", data);
    // const data = await response.json();
    if (data.success) {
      dispatch(setUserLogin(data));
    } else {
      toast.error("Register Fail");
    }
  }

  const loginSubmit = async (e) => {
    e.preventDefault();

    let phone_number = "+91" + e.target.phone.value;
    first_name = e.target.firstname.value;
    last_name = e.target.lastname.value;
    birth_date = e.target.dob.value;
    email = e.target.email.value;
    pincode = e.target.pincode.value;
    address = e.target.email.value;
    area = e.target.area.value;
    mobile_number = e.target.phone.value;
    gender = e.target.gender.value;

    const data = await queryfn({
      endpoint: baseURL + "/user/check-login",
      reqMethod: "POST",
      body: JSON.stringify({
        mobile_number: e.target.phone.value,
      }),
    });
    console.log("Check user:: ", data);
    if (data.success) {
      return toast.error("Already registered number");
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
        console.error(error.message);
      });
  };

  const otpSubmit = (e) => {
    e.preventDefault();

    let opt_number = e.target.otp_value.value;

    window.confirmationResult
      .confirm(opt_number)
      .then(async (confirmationResult) => {
        console.log(confirmationResult);
        console.log("success");
        await setUserData();
        await getUserData(e);
      })
      .catch((error) => {
        console.error(error.message);
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
                <h3 className={regpage.title}>Register Now</h3>
                <label htmlFor="username">First Name</label>
                <input type="text" name="firstname" id="firstname" required />
                <label htmlFor="username">Last Name</label>
                <input type="text" name="lastname" id="lastname" required />
                <label htmlFor="username">Mobile Number</label>
                <input
                  placeholder="Enter Your Phone Number"
                  type="number"
                  name="phone"
                />
                <label htmlFor="username">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="username">Date of Birth</label>
                <input name="dob" type="date" id="dob" required />
                <label htmlFor="username">Gender</label>
                <select name="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                <label htmlFor="username">Area</label>
                <input type="text" id="username" name="area" required />
                <label htmlFor="username">Pincode</label>
                <input type="text" id="username" name="pincode" required />
                <label htmlFor="username">Address</label>
                <textarea
                  type="text"
                  id="username"
                  // ref={userRef}
                  // autoComplete="off"
                  name="address"
                  required
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
            <Model title="" close={() => setViewOtpForm(false)}>
              <form onSubmit={otpSubmit} style={{ width: "100%" }}>
                <h3
                  style={{ textAlign: "center", margin: "10px" }}
                  className="otptitle"
                >
                  Verify Otp
                </h3>
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
}

export default Register;
