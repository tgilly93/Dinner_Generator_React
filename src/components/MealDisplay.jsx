import React from "react";
import { Row, Col, Image, ListGroup, Ratio, Container } from "react-bootstrap";

function MealDisplay({ meal }) {
  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  const videoId = meal.strYoutube?.split("v=")[1];

  return (
    <Container className="p-3 bg-white rounded shadow-sm">
      <Row className="mb-4">
        <Col md={5}>
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fluid
            rounded
            className="mb-3"
          />
        </Col>
        <Col md={7}>
          <h2>{meal.strMeal}</h2>
          <p>
            <strong>Category:</strong> {meal.strCategory} <br />
            <strong>Area:</strong> {meal.strArea}
          </p>

          {ingredients.length > 0 && (
            <>
              <h5>Ingredients</h5>
              <ListGroup className="mb-3">
                {ingredients.map((ingredient, index) => (
                  <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
            )}
            </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <h5>Instructions</h5>
            <p style={{whiteSpace: "pre-line" }}>{meal.strInstructions}</p>
          </Col>
        </Row>

        {videoId && (
          <Row>
            <Col>
              <h5>Video Tutorial</h5>
              <Ratio aspectRatio="16x9">
                <iframe
                  title="YouTube video"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  allowFullScreen
                />
              </Ratio>
            </Col>
          </Row>
        )}
        </Container>
  );
}

export default MealDisplay;
