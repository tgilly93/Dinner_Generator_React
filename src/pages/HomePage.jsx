import React, { useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import mealService from "../assets/services/mealService";
import RandomMealsSection from "../components/RandomMealsSection";

function HomePage() {
  const mealPlanRef = useRef();
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

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light"
    >
      <Row>
        <Col className="text-center">
          <h1 className="display-4">Welcome to the HomePage!</h1>
          <p className="lead">This is a homepage</p>

          <div>
            <div className="text-center my-4">
              <button
                className="btn btn-primary"
                onClick={handleGenerateMealPlan}
              >
                Get Meal Plan
              </button>
            </div>

            <RandomMealsSection
              ref={mealPlanRef}
              mealPlan={mealPlan}
              loading={loading}
              error={error}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default HomePage;
