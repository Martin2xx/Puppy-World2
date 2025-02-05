import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";


export default function NavBarMenu() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Q&A</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
