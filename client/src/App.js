import React from'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/login';
import Signup from './Components/Signup/SignUp';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
