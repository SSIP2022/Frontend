import React from "react";

function Register() {
  return (
    <div>
      <div className="formWrapper">
      <form>
      <h3 className="title">Register Now</h3>
        <label htmlFor="username">First Name</label>
        <input
          type="text"
          id="firstname"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />
        <label htmlFor="username">Last Name</label>
        <input
          type="text"
          id="lastname"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />
        <label htmlFor="username">📱 Mobile Number</label>
        <input
          type="number"
          id="mobilenumber"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />
        <label htmlFor="username">📩 Email</label>
        <input
          type="email"
          id="email"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />

        <label htmlFor="username">📅 Date of Birth</label>
        <input
          type="date"
          id="dob"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />

        <label htmlFor="username">Gender</label>
        <select>
          <option>👨🏻 Male</option>
          <option>👩🏻 Female</option>
          <option>Other</option>
        </select>
        

        
        <label htmlFor="username">🔢 Pincode</label>
        <input
          type="text"
          id="username"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />
        

        <label htmlFor="username">🌐 Area</label>
        <input
          type="text"
          id="username"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />

        <label htmlFor="username">🏙️ District</label>
        <input
          type="text"
          id="username"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />



        <button>Register</button>
      </form>
    </div>
    </div>
    
  );
}

export default Register;
