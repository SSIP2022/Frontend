import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/admin/index";
import "./App.scss";
import Root from "./pages/root";
import User from "./pages/user/index";
import Department from "./pages/department";
import AdminAnalytics from "./pages/admin/components/AdminAnalytics";
import UserAnalytics from "./pages/user/components/UserAnalytics";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/user" element={<User/>}/>
        <Route path="/department" element={<Department />} />
        <Route path="/admin" element={<Admin />}/>
      </Routes>
    </>
  );
}

export default App;
