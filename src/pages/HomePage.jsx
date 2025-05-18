import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import mealService from "../assets/services/mealService";
import RandomMealsSection from "../components/RandomMealsSection";
import MealDisplay from "../components/MealDisplay";
import RotatingDisappearText from "../components/RotatingDisappearText";
import "../styles/TextAnimation.css";
import FoodSpinner from "../components/FoodSpinner";

function HomePage() {
  const mealPlanRef = useRef();
  const mealResultRef = useRef();
  const browseDropdownRef = useRef();
  const [mealPlan, setMealPlan] = useState([]);
  const [randomMeal, setRandomMeal] = useState(null);
  const [loadingRandom, setLoadingRandom] = useState(false);
  const [randomError, setRandomError] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [planError, setPlanError] = useState("");

  const scrollToRefWithOffset = (ref, offset = -80) => {
    if (ref.current) {
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

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

  const handleGetRandomMeal = async () => {
    try {
      setLoadingRandom(true);
      setRandomError(null);
      setRandomMeal(null);

      const randomresult = await mealService.getRandomMeal();
      if (randomresult) {
        setRandomMeal(randomresult);
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

  useEffect(() => {
    if (mealPlan.length > 0 && mealPlanRef.current) {
      scrollToRefWithOffset(mealPlanRef);
    }
  }, [mealPlan]);

  useEffect(() => {
    if (randomMeal) {
      scrollToRefWithOffset(mealResultRef);
    }
  }, [randomMeal]);

  return (
    <Container fluid className="full-background">
      <Row className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <Col xs={10} md={8} lg={6}>
          <div className="mb-4">
            <FoodSpinner />
          </div>
          <div className="rotating-text-container">
            <RotatingDisappearText
              textArray={[
                "Welcome to Meal Generator!",
                "Decision fatigue? Let Us Decide!",
                "Eating Made Easy!",
              ]}
            />
          </div>

          <div className="d-flex text-center justify-content-center gap-3 my-4">
            <Button onClick={handleGetRandomMeal} variant="primary">
              Generate Meal
            </Button>
            <Button onClick={handleGenerateMealPlan} variant="primary">
              Generate Meal Plan
            </Button>
          </div>
        </Col>
      </Row>

      <Row ref={mealResultRef}>
        <Col>
          {loadingRandom && (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" variant="primary" />
            </div>
          )}
          {randomError && <Alert variant="danger">{randomError}</Alert>}
          {randomMeal && (
            <>
              <h2 className="text-center display-5 fw-bold my-4 text-primary">
                Enjoy your random meal!
              </h2>
              <MealDisplay meal={randomMeal} />

              <div className="text-center my-5">
                <h4 className="mb-4 text-secondary fw-semibold">
                  Not Satisfied?
                </h4>
                <div className="d-flex justify-content-center gap-4">
                  <Button
                    variant="outline-primary"
                    onClick={handleGetRandomMeal}
                  >
                    Pick Again!
                  </Button>
                </div>
              </div>
            </>
          )}
        </Col>
      </Row>

      {mealPlan.length > 0 && (
        <Row ref={mealPlanRef}>
          <Col>
            <h2 className="text-center display-5 fw-bold my-4 text-primary">
              Your Daily Meal Plan!
            </h2>
            <RandomMealsSection
              mealPlan={mealPlan}
              loading={loadingPlan}
              error={planError}
            />
            <div className="text-center my-5">
              <h4 className="mb-4 text-secondary fw-semibold">
                Not Satisfied?
              </h4>
              <div className="d-flex justify-content-center gap-4">
                <Button
                  variant="outline-primary"
                  onClick={handleGenerateMealPlan}
                >
                  Pick Again!
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}
export default HomePage;
