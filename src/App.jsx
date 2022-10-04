import React from "react";
import { Routes , Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import "./App.scss";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element = {<Admin/>}/>
    </Routes>
    </>
  );
}

export default App;
