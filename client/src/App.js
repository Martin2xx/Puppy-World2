import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBarMenu from "./Components/NavBarMenu";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/SignUp";
import Questions from "./Components/Questions/Questions";

function App() {
  return (
    <Router>
      <NavBarMenu /> {/* Make sure the navbar is always visible */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </Router>
  );
}

export default App;
