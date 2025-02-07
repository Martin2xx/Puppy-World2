import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBarMenu from "./Components/NavBarMenu/NavBarMenu";
import Signup from "./Components/Signup/Signup"; 
import Login from "./Components/Login/Login";
import Questions from "./Components/Questions/Questions";
import "./styles.css";

function App() {
  return (
    <>
      <NavBarMenu />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </>
  );
}

export default App;
