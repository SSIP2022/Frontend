import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/index";
import "./App.scss";
import Root from "./pages/root";
import User from "./pages/user/index";
import Department from "./pages/department";
import Complaints from "./pages/admin/components/Adminanalytics";
import UserAnalytics from "./pages/user/components/UserAnalytics";
import Login from "./pages/login";
import Register from "./pages/register";
import Complain from "./pages/admin/components/Complain";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />}>
          <Route path="analytics" element={<UserAnalytics />} />
        </Route>
        <Route path="/department" element={<Department />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="analytics" element={<Complaints/>}/>
          <Route path="complaint" element={<Complain/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
