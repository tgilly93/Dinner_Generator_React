import React from "react";
import { Navbar, Nav, NavDropdown, Container, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="rounded" aria-label="Ninth navbar example">
      <Container fluid="xl">
        <Navbar.Brand as={NavLink} to="/">Container XL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarsExample07XL" />
        <Navbar.Collapse id="navbarsExample07XL">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
            <Nav.Link href="#">Link</Nav.Link>
            <Nav.Link href="#" disabled>Disabled</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Action</NavDropdown.Item>
              <NavDropdown.Item href="#">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" role="search">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
    