import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Root from "./pages/root";
import Department from "./pages/department";
import Login from "./pages/login";
import Register from "./pages/register";

import Admin from "./pages/admin/index";
import Adminanalytics from "./pages/admin/components/Adminanalytics";
import Profile from "./pages/admin/components/Profile";
import Complaints from "./pages/admin/components/Complaint";

import User from "./pages/user/index";
import UserProfile from "./pages/user/components/Profile";
import RegisterComplaint from "./pages/user/components/RegisterComplaint";
import UserDashboard from "./pages/user/components/UserDashboard";
import { Toaster } from "react-hot-toast";

import { baseURL } from "../src/config/config";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const setAuth = (boolean) => {
  //   setIsAuthenticated(boolean);
  // };

  // const isAuth = async () => {
  //   try {
  //     const response = await fetch(baseURL + "/user/check-login", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-type": "application/json;charset=UTF-8",
  //       },
  //       body: JSON.stringify({
  //         mobile_number: localStorage.token,
  //       }),
  //     });
  //     const data = await response.json();
  //     data.success ? setAuth(true) : setAuth(false);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   console.log("Test");
  //   isAuth();
  // });
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="home" element={<RegisterComplaint />} />
        </Route>
        <Route path="/department" element={<Department />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="analytics" element={<Adminanalytics />} />
          <Route path="home" element={<Complaints />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
