import React from "react";
import regpage from "../../../styles/Registerpage.module.scss";
import { baseURL, queryfn } from "../../../config/config";
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
      department: null,
    }),
    failMsg: "User can not created",
  });

  // const data = await response.json();
  console.log("Register data:", data);
}
export default function Register() {
  return (
    <>
      <div className="formWrapper">
        <form>
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
          {/* <span>New here?</span> */}
          {/* <Link to="/register">
            <span>
              {" "}
              Register <FiExternalLink />
            </span>
          </Link> */}
        </form>
      </div>
    </>
  );
}
