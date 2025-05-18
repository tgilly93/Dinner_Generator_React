import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AreaDisplay from "../components/AreaDisplay";
import mealService from "../assets/services/mealService";

function AreaPage() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAreas() {
      try {
        const result = await mealService.getAllMealAreas();
        if (result) {
          setAreas(result);
        } else {
          setError("No areas found.");
        }
      } catch (err) {
        console.error("Error fetching areas:", err);
        setError("An error occurred while fetching the areas.");
      } finally {
        setLoading(false);
      }
    }
    fetchAreas();
  }, []);

  return (
    <Container className="py-5 full-background">
      <Row>
        <Col className="text-center">
          <h1 className="display-4">Explore Meals by Area</h1>
          <p className="lead">Discover meals from around the world!</p>
        </Col>
      </Row>

      <AreaDisplay areas={areas} loading={loading} error={error} />
    </Container>
  );
}

export default AreaPage;
