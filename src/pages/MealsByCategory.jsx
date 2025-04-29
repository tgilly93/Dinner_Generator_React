import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { useParams } from "react-router-dom";
import mealService from "../assets/services/mealService";
import MealCard from "../components/MealCard";

function MealsByCategory() {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const data = await mealService.getMealsByCategory(categoryName);
        setMeals(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMeals();
  }, [categoryName]);

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
    <Container className="py-5 bg-light">
      <h2 className="text-center mb-4">{categoryName} Meals</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {meals.map((meal) => (
          <Col key={meal.idMeal}>
            <MealCard meal={meal} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MealsByCategory;
