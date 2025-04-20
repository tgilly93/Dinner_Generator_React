import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import mealService from "../assets/services/mealService";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import MealCard from "../components/MealCard";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("s");
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const results = await mealService.searchMealByName(query);
        setMeals(results || []);
      } catch (err) {
        console.error("Error searching meals:", err);
        setError("An error occurred while fetching meals.");
      } finally {
        setLoading(false);
      }
    }

    if (query) fetchMeals();
  }, [query]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Search Results for "{query}"</h2>
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {meals.map((meal) => (
          <Col key={meal.idMeal} xs={12} md={6} lg={4} className="mb-4">
            <MealCard meal={meal} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchResults;
