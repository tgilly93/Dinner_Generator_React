import React from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function IngredientDisplay({ ingredients, loading, error }) {
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
        Failed to load ingredients: {error.message}
      </Alert>
    );
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
      {ingredients.map((ingredient, index) => (
        <Col key={index}>
          <Link
            to={`/ingredient/${ingredient.strIngredient}`}
            className="text-decoration-none text-dark"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="h-100 shadow-sm text-center">
                <Card.Img
                  variant="top"
                  src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`}
                  alt={`Image of ${ingredient.strIngredient}`}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{ingredient.strIngredient}</Card.Title>
                  <Card.Text>
                    {ingredient.strDescription
                      ? ingredient.strDescription.length > 100
                        ? `${ingredient.strDescription.slice(0, 100)}...`
                        : ingredient.strDescription
                      : "No description available."}
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default IngredientDisplay;
