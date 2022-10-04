import React from "react";
import { Routes , Route } from "react-router-dom";
import Hello from "./Components/Home";
import Admin from "./Components/Admin/Admin";
import "./App.scss";

function App() {
  return (
    <>
    <Routes>
      <Route path="*" element = {<Hello/>}/>
      <Route path="/admin" element = {<Admin/>}/>
    </Routes>
    </>
  );
}

export default App;
