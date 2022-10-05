import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
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
        </Route>
        <Route path="/department" element={<Department />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="analytics" element={<Adminanalytics/>}/>
          <Route path="complaints" element={<Complaints/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
