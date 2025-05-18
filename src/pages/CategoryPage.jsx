import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import mealService from "../assets/services/mealService";
import CategoryDisplay from "../components/CategoryDisplay";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await mealService.getAllMealCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <Container className="py-5 full-background">
      <Row>
        <Col className="text-center">
          <h1 className="display-4">Welcome to the Category Page!</h1>
          <p className="lead">This is a category page</p>
        </Col>
      </Row>

      <CategoryDisplay
        categories={categories}
        loading={loading}
        error={error}
      />
    </Container>
  );
}

export default CategoryPage;
