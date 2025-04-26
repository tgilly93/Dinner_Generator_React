import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import mealService from "../assets/services/mealService";
import IngredientDisplay from "../components/IngredientDisplay";

function IngredientPage() {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const result = await mealService.getAllIngredients();
        if (result) {
          setIngredients(result);
        } else {
          setError("No ingredients found.");
        }
      } catch (err) {
        console.error("Error fetching ingredients:", err);
        setError("An error occurred while fetching the ingredients.");
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);

  return (
    <Container className="py-5 bg-light">
      <Row>
        <Col className="text-center">
          <h1 className="display-4">Explore meals by Ingredient</h1>
          <p className="lead">Discover meals based on ingredients!</p>
        </Col>
      </Row>

      <IngredientDisplay
        ingredients={ingredients}
        loading={loading}
        error={error}
      />
    </Container>
  );
}

export default IngredientPage;
