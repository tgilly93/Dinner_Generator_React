import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner, Alert } from "react-bootstrap";
import MealDisplay from "../components/MealDisplay";
import mealService from "../assets/services/mealService";

function MealResult() {
  const { mealId } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeal() {
      try {
        const result = mealId
          ? await mealService.getMealById(mealId)
          : await mealService.getRandomMeal();

        if (result) {
          setMeal(result);
        } else {
          setError("No meal found.");
        } 
      } catch (err) {
        console.error("Error fetching meal:", err);
        setError("An error occurred while fetching the meal.");
      } finally {
        setLoading(false);
      }
    }
    fetchMeal();
  }, [mealId]);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;


  return (
    <Container className="mt-4">
      <MealDisplay meal={meal} />
  </Container>
  );
}

export default MealResult;