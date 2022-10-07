import React from "react";
import { useState } from "react";
import { baseURL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import regpage from "../../styles/Registerpage.module.scss"
import { Link } from "react-router-dom";
import {FiExternalLink} from "react-icons/fi"
function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [district, setDistrict] = useState("Ahmedabad");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Male");
  async function handleRegister(e) {
    e.preventDefault();
    console.log("baseURL:", baseURL);
    const response = await fetch(baseURL + "/user/register", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        birth_date: dob,
        email,
        pincode,
        address,
        area,
        district,
        mobile_number: mobile,
        gender,
      }),
      credentials: "include",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });

    const data = await response.json();
    console.log("data:", data);

    if (data.success) {
      toast.success("Register Successfully");
      navigate("/login");
    }else{
      toast.error("Registeration Fail");
    }
  }
  return (
      <>


    <div>
      <div className={regpage.formWrapper}>
        <form onSubmit={handleRegister}>
          <h3 className={regpage.title}>Register Now</h3>
          <label htmlFor="username">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            required
          />
          <label htmlFor="username">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          />
          <label htmlFor="username">Mobile Number</label>
          <input
            type="number"
            id="mobilenumber"
            onChange={(e) => setMobile(e.target.value)}
            minlength
            value={mobile}
            required
          />
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="username">Date of Birth</label>
          <input
            type="date"
            id="dob"
            onChange={(e) => setDob(e.target.value)}
            value={dob}
            required
          />

          <label htmlFor="username">Gender</label>
          <select onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="username">Pincode</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setPincode(e.target.value)}
            value={pincode}
            required
          />

          <label htmlFor="username">Area</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setArea(e.target.value)}
            value={area}
            required
          />

          <label htmlFor="username">District</label>
          <input
            type="text"
            id="username"
            // ref={userRef}
            // autoComplete="off"
            onChange={(e) => setDistrict(e.target.value)}
            value={district}
            required
          />

          <label htmlFor="username">Address</label>
          <textarea
            type="text"
            id="username"
            // ref={userRef}
            // autoComplete="off"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
          />

          <button type="submit">Register</button>
          <span>Already Registered?</span>
          <Link to="/login"><span> Login here <FiExternalLink /></span></Link>
           
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;
