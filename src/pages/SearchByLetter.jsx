import React, { useState, useRef } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import MealCard from "../components/MealCard";
import mealService from "../assets/services/mealService";
import AnimatedModal from "../components/AnimatedModal";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function SearchByLetter() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeLetter, setActiveLetter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const resultsRef = useRef(null);

  const handleLetterClick = async (letter) => {
    setLoading(true);
    setError(null);

    try {
      const results = await mealService.getMealsByFirstLetter(letter);
      setActiveLetter(letter);
      setMeals(results || []);

      if (!results || results.length === 0) {
        setShowModal(true);
      } else {
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } catch (error) {
      console.error("Error fetching meals by letter:", error);
      setError("An error occurred while fetching meals.");
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="pt-4 d-flex flex-column min-vh-100 mb-4">
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <h2 className="mb-3 text-center">Search Meals by Letter</h2>
        <div className="mb-4 d-flex flex-wrap gap-2 justify-content-center">
          {letters.map((letter) => (
            <Button
              key={letter}
              variant={activeLetter === letter ? "primary" : "outline-dark"}
              onClick={() => handleLetterClick(letter)}
              disabled={loading && activeLetter === letter}
            >
              {letter}
            </Button>
          ))}
        </div>
      </div>

      <div ref={resultsRef} className="mt-4 px-3">
        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {meals.length > 0 && (
          <>
            <h4 className="mt-4">Meals Found:</h4>
            <Row className="g-3">
              {meals.map((meal) => (
                <Col xs={12} sm={6} md={4} lg={3} key={meal.idMeal}>
                  <MealCard meal={meal} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>

      <AnimatedModal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="No Results Found"
        body={`No meals found for the letter "${activeLetter}". Please choose another letter.`}
        onCloseLabel="Close"
      />
    </Container>
  );
}

export default SearchByLetter;
