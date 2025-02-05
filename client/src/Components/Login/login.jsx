import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

export default function Login({ setUser }) {
  const [formData, setFormData] = useState({
    user_name: "",
    user_password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); 
  
    try {
      const response = await axios.post("http://localhost:3002/login", formData);
  
      if (response.data.length > 0) {
        const DBuser = response.data[0];
        setUser({ user_id: DBuser.user_id, user_name: DBuser.user_name });
  
        localStorage.setItem("user", JSON.stringify(DBuser)); 
        navigate("/questions"); 
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white shadow rounded" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                name="user_password"
                value={formData.user_password}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
