import React, { useState , useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { baseURL } from '../../config/config';

const Login= (props)=> {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState('');
  const [user, setUser] = useState(false);

  const firebaseConfig = {
    apiKey: "AIzaSyCrsq8N2NQZ5WSg8NoxwZgdtcPT-yaf9bg",
    authDomain: "ssip-5767d.firebaseapp.com",
    projectId: "ssip-5767d",
    storageBucket: "ssip-5767d.appspot.com",
    messagingSenderId: "981917289800",
    appId: "1:981917289800:web:7ef7ba8c74a2d3c65ef77d"
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

  const loginSubmit = async (e) => {
    e.preventDefault();

    
    let phone_number = "+91" + e.target.phone.value;
    console.log(e.target.phone.value);
    console.log("baseURL:", baseURL);
    const response = await fetch (baseURL + "/user/check-login",{
      method:"POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        mobile_number: e.target.phone.value
      })
    })
    const data = await response.json();
    console.log(data);
    if(!data.success)
    {
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
        props.check(true)
        localStorage.setItem("token",e.target.phone.value)
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
            {!viewOtpForm ? 
            (<>
             <form onSubmit={loginSubmit}>
             <h3 className="title">Login Now</h3>
             <label htmlFor="username">Mobile Number</label>
             <input 
              placeholder='Enter Your Phone Number'
              type="number"
              name="phone"
              />
            <button type="sumbit">Send</button>
            </form>
            </>
            ) : 
            
            (<>         
            <form onSubmit={otpSubmit}>
            <h3 className="title">Verify Otp</h3>
              <label htmlFor="username">Enter Your Otp</label>
              <input 
              placeholder='Enter Your Phone Number'
              type="number"
              name="otp_value"
              />
             <button type="sumbit">Submit</button>
             </form>
             </>
            )
            }
          </>
      </div>
    </div>
  );
}

export default Login;
