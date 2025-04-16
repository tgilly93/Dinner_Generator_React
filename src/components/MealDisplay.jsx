import { useState, useEffect } from "react";
import React from "react";
import mealService from "../assets/services/mealService";
import { Container, Row, Col, Card, Image, Spinner, Alert } from "react-bootstrap";

function MealDisplay() {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const randomMeal = await mealService.getRandomMeal();
        setMeal(randomMeal);
      } catch (error) {
        console.error("Error fetching random meal:", error);
        setError("Sorry, we couldn't load a random meal. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm mt-4">
            <Card.Body>
              <Card.Title className="text-center">🍽️ Meal Display</Card.Title>
              {loading && (
                <div className="text-center">
                  <Spinner animation="border" role="status" />
                </div>
              )}
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              {meal && (
                <>
                  <Card.Text className="text-center fw-bold">
                    {meal.strMeal}
                  </Card.Text>
                  <Image
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    fluid
                    rounded
                    className="mb-3"
                  />
                  <Card.Text>
                    <strong>Category:</strong> {meal.strCategory} <br />
                    <strong>Area:</strong> {meal.strArea} <br />
                    <strong>Instructions:</strong>
                    <br />
                    {meal.strInstructions}
                  </Card.Text>
                  {meal.strYoutube && (
                    <Card.Text className="text-center">
                      <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🎥 Watch on YouTube
                      </a>
                    </Card.Text>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default MealDisplay;
