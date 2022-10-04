import React from "react";
import { Routes , Route } from "react-router-dom";
import Hello from "./Components/Home";

function App() {
  return (
    <>
    <Routes>
      <Route path="*" element = {<Hello/>}/>
    </Routes>
    </>
  );
}

export default App;
