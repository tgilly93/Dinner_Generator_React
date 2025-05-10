import React, { useRef, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import mealService from "../assets/services/mealService";
import RandomMealsSection from "../components/RandomMealsSection";
import MealResult from "./MealResult";

function HomePage() {
  const mealPlanRef = useRef();
  const mealResultRef = useRef();
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerateMealPlan = async () => {
    try {
      setLoading(true);
      setError("");

      const meals = await mealService.getRandomMealPlan();
      setMealPlan(meals);

      mealPlanRef.current.scrollIntoView({ behavior: "smooth" });
      
    } catch (error) {
      console.error("Error generating meal plan:", error);
      setError("Failed to generate meal plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToMealResult = () => {
    mealResultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Container
      fluid
      className="bg-light"
    >
      <Row className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <Col className="text-center">
          <h1 className="display-4">Welcome to the HomePage!</h1>
          <p className="lead">This is a homepage</p>

            <div className="d-flex text-center justify-content-center gap-3 my-4">
              <Button onClick={handleGenerateMealPlan} variant="primary">
                Get Daily Meal Plan
              </Button>
              <Button onClick={handleScrollToMealResult} variant="secondary">
                Get Random Meal
              </Button>
            </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <RandomMealsSection
              ref={mealPlanRef}
              mealPlan={mealPlan}
              loading={loading}
              error={error}
            />
        </Col>
      </Row>

      <Row ref={mealResultRef}>
        <Col>
          <MealResult />
        </Col>
      </Row>
    </Container>
  );
}
export default HomePage;
