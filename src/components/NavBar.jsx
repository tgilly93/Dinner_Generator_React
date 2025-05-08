import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?s=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      bg="dark"
      className="rounded"
      aria-label="Ninth navbar example"
    >
      <Container fluid="xl">
        <Navbar.Brand as={NavLink} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarsExample07XL" />
        <Navbar.Collapse id="navbarsExample07XL">
          <Nav className="me-auto mb-2 mb-lg-0">
            <NavDropdown title="Browse Options" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/areas">
                Areas
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/categories">
                Categories
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/ingredients">
                Ingredients
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/search-by-letter">
                Search by Letter
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex" role="search " onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
