import React from "react";
import { Card, ListGroup, Ratio } from "react-bootstrap";

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
    <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={meal.strMealThumb} />
      <Card.Body>
        <Card.Title>{meal.strMeal}</Card.Title>
        <Card.Text>
          <strong>Category:</strong> {meal.strCategory} <br />
          <strong>Area:</strong> {meal.strArea} <br />
        </Card.Text>

        <h5>Instructions</h5>
        <Card.Text style={{ whiteSpace: "pre-line" }}>
          {meal.strInstructions}
        </Card.Text>

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

        {videoId && (
          <>
            <h5>Video Tutorial</h5>
            <Ratio aspectRatio="16x9">
              <iframe
                title="YouTube video"
                src={`https://www.youtube.com/embed/${videoId}`}
                allowFullScreen
              />
            </Ratio>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default MealDisplay;
