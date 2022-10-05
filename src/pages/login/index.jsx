import React from "react";

function Login() {
  return (
    <div>
      <div className="formWrapper">
        <form>
          <h3 className="title">Login Now</h3>

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

          <button>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
