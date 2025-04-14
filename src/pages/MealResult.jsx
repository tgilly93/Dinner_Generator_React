import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MealDisplay from "../components/MealDisplay";

function MealResult() {
  return (
    <Container className="py-5 bg-light">
    <Row>
      <Col className="text-center">
        <h1 className="display-4">Welcome to the Meal Result Page!</h1>
        <p className="lead">This is a meal result page</p>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
        <MealDisplay />
      </Col>
    </Row>
  </Container>
  );
}

export default MealResult;