import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Root from "./pages/root";
import Login from "./pages/login";
import Register from "./pages/register";

import Department from "./pages/department/index";
import Complaint from "./pages/department/components/Complaint";  



import Admin from "./pages/admin/index";
import Adminanalytics from "./pages/admin/components/Adminanalytics";
import Profile from "./pages/admin/components/Profile";
import Complaints from "./pages/admin/components/Complaint";

import User from "./pages/user/index";
import UserProfile from "./pages/user/components/Profile";
import RegisterComplaint from "./pages/user/components/RegisterComplaint";
import UserDashboard from "./pages/user/components/UserDashboard";
import { Toaster } from "react-hot-toast";
import Home from "./pages/user/components/Home";

import { baseURL } from "../src/config/config";
import OfficerComplain from "./pages/department/components/Complaint";
import AdminProfile from "./pages/department/components/Profile";

import Worker from "./pages/worker/index";
import WorkerProfile from "./pages/worker/components/Profile";
import Tasks from "./pages/worker/components/Tasks";
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
          <Route path="registercomplaint" element={<RegisterComplaint />} />
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="/officer" element={<Department />}>
          <Route path="home" element={<OfficerComplain />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route path="analytics" element={<Adminanalytics />} />
          <Route path="home" element={<Complaints />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/worker" element={<Worker />}>
          <Route path="profile" element={<WorkerProfile />} />
          <Route path="home" element={<Tasks />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
