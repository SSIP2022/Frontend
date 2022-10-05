import React from "react";

function Login() {
  return (
    <div className="formWrapper">
      <form>
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          // ref={userRef}
          // autoComplete="off"
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          required
        />
      </form>
    </div>
  );
}

export default Login;
