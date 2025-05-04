import React from "react";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import areaFlags from "../utils/areaFlags";
import { motion } from "framer-motion";

function AreaDisplay({ areas, loading, error }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        Failed to load areas: {error.message}
      </Alert>
    );
  }

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 mt-4">
      {areas.map((area, index) => {
        const flagUrl =
          areaFlags[area.strArea] ||
          "https://via.placeholder.com/300x200?text=No+Flag";

        return (
          <Col key={index}>
            <Link
              to={`/area/${area.strArea}`}
              className="text-decoration-none text-dark"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="h-100 shadow-sm text-center">
                  <Card.Img
                    variant="top"
                    src={flagUrl}
                    alt={`Flag of ${area.strArea}`}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{area.strArea}</Card.Title>
                  </Card.Body>
                </Card>
              </motion.div>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}

export default AreaDisplay;
