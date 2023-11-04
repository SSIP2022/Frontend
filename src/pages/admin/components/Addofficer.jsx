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
let department = "";
async function setUserData(e) {

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
  department = e.target.department.value
  console.log(phone_number)
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
      role: "officer",
      department: department,
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
        <form onSubmit={setUserData}>
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
          <label htmlFor="username">Department</label>
          <select name="department">
            <option value="Bharuch">Bharuch</option>
            <option value="Surat">Surat</option>
            <option value="Rajkot">Rajkot</option>
          </select>

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
