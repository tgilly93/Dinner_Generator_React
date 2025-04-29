import React from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoryDisplay({ categories, loading, error }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        Failed to load categories: {error.message}
      </Alert>
    );
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
      {categories.map((category) => (
        <Col key={category.idCategory}>
          <Link
            to={`/category/${category.strCategory}`}
            className="text-decoration-none text-dark"
          >
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={category.strCategoryThumb}
                alt={category.strCategory}
              />
              <Card.Body>
                <Card.Title>{category.strCategory}</Card.Title>
                <Card.Text>
                  {category.strCategoryDescription.slice(0, 100)}...
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default CategoryDisplay;
