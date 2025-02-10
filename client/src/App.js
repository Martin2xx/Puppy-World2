import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBarMenu from "./Components/NavBarMenu/NavBarMenu";
import Signup from './Components/Signup/Signup.jsx';  // Use "Signup" instead of "SignUp"
 import Questions from "./Components/Questions/Questions.jsx";
import Home from "./Components/Home/Home.jsx"; 
import { useState } from "react";
import Login from './Components/Login/Login.jsx'


function App() {

  const [user, setUser] = useState ({
    user_id: "",
    user_name:""
  })

  return (
    <>
      <NavBarMenu />
      <Routes>
    
        <Route path="/" element={<Home />} /> 
        <Route path="/signup" element={<Signup user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login user={user} setUser={setUser} />} />
        <Route path="/questions" element={<Questions user={user} setUser={setUser}  />} />
      </Routes>
    </>
  );
}

export default App;