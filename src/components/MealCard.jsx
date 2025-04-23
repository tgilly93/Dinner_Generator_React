import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function MealCard({ meal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/meal/${meal.idMeal}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03 }}>
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
    </motion.div>
    
  );
}

export default MealCard;
