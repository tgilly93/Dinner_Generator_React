import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MealCard({ meal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meal/${meal.idMeal}`);
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={meal.strMealThumb} alt={meal.strMeal} style={{ maxHeight: "200px", objectFit: "cover" }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{meal.strMeal}</Card.Title>
        <Card.Text>
          <strong>Category:</strong> {meal.strCategory} <br />
          <strong>Area:</strong> {meal.strArea}
        </Card.Text>
        <Button variant="primary" onClick={handleClick} className="mt-auto">
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MealCard;
