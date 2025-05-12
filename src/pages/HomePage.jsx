import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import mealService from "../assets/services/mealService";
import RandomMealsSection from "../components/RandomMealsSection";
import MealDisplay from "../components/MealDisplay";

function HomePage() {
  const mealPlanRef = useRef();
  const mealResultRef = useRef();
  const [mealPlan, setMealPlan] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [randomError, setRandomError] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [planError, setPlanError] = useState("");

  const handleGenerateMealPlan = async () => {
    try {
      setLoadingPlan(true);
      setPlanError("");

      const meals = await mealService.getRandomMealPlan();
      setMealPlan(meals);
    } catch (error) {
      console.error("Error generating meal plan:", error);
      setPlanError("Failed to generate meal plan. Please try again.");
    } finally {
      setLoadingPlan(false);
    }
  };

  useEffect(() => {
  if (mealPlan.length > 0 && mealPlanRef.current) {
    const yOffset = -80; 
    const y = mealPlanRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}, [mealPlan]);

  const handleGetRandomMeal = async () => {
    try {
      setLoadingRandom(true);
      setRandomError(null);
      setRandomMeal(null);

      const randomresult = await mealService.getRandomMeal();
      if (randomresult) {
        setRandomMeal(randomresult);
        setTimeout(() => {
          mealResultRef.current.scrollIntoView({ behavior: "smooth" });
        }, 0);
      } else {
        setRandomError("No meal found.");
      }
    } catch (error) {
      console.error("Error fetching random meal:", error);
      setRandomError("Failed to fetch random meal. Please try again.");
    } finally {
      setLoadingRandom(false);
    }
  };

  return (
    <Container fluid className="bg-light">
      <Row className="d-flex flex-column justify-content-center align-items-center">
        <Col className="text-center">
          <h1 className="display-4">Welcome to the HomePage!</h1>
          <p className="lead">This is a homepage</p>

          <div className="d-flex text-center justify-content-center gap-3 my-4">
            <Button onClick={handleGetRandomMeal} variant="primary">
              Get Random Meal
            </Button>
            <Button onClick={handleGenerateMealPlan} variant="primary">
              Get Daily Meal Plan
            </Button>
          </div>
        </Col>
      </Row>

      <Row ref={mealResultRef}>
        <Col>
          {loadingRandom && <Spinner animation="border" variant="primary" />}
          {randomError && <Alert variant="danger">{randomError}</Alert>}
          {randomMeal && <MealDisplay meal={randomMeal} />}
        </Col>
      </Row>

      {mealPlan.length > 0 && (
        <Row ref={mealPlanRef}>
          <Col>
            <RandomMealsSection
              mealPlan={mealPlan}
              loading={loadingPlan}
              error={planError}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default HomePage;
