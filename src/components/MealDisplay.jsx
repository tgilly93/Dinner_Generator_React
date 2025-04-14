import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function MealDisplay() {
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-center">🍽️ Meal Display</Card.Title>
              <Card.Text className="text-center">
                This is where the meal details will show up.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default MealDisplay;