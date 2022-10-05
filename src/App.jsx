import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./components/admin/Admin";
import "./App.scss";
import Root from "./pages/root";
import User from "./pages/user";
import Department from "./pages/department";
import AdminAnalytics from "./pages/admin/components/AdminAnalytics";
import UserAnalytics from "./pages/user/components/UserAnalytics";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/user" element={<User />}>
          <Route path="analytics" element={<UserAnalytics />} />
        </Route>
        <Route path="/department" element={<Department />} />
        <Route path="/admin" element={<Admin />}>
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
