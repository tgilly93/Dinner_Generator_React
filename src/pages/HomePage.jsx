import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function HomePage() {
  return (
    <Container fluid className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <Row>
        <Col className="text-center">
          <h1 className="display-4">Welcome to the HomePage!</h1>
          <p className="lead">This is a homepage</p>
          </Col>
      </Row>
    </Container>
  );
}
export default HomePage;