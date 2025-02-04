import React, { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export default function Signup() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3002/users/", formData);
      alert("Signup successful!");
    } catch (error) {
      console.error(error);
      alert("Signup failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white shadow rounded" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="user_name"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="user_password"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>
          <Button type="submit" variant="primary" className="w-100">
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
}
