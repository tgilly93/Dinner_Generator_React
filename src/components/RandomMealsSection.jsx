import React, { forwardRef } from "react";
import MealCard from "./MealCard";
import { Spinner, Alert, Row } from "react-bootstrap";

const RandomMealsSection = forwardRef(({ mealPlan, loading, error }, ref) => {
    return (
        <div ref={ref} className="my-5">
            {loading && (
                <div className="text-center py-5">
                    <Spinner animation="border" role="status" variant="primary" />
                </div>
            )}
            {error && (
                <div className="text-center py-5">
                    <Alert variant="danger">
                        Failed to load meals: {error.message}
                    </Alert>
                </div>
            )}
            <Row>
                {mealPlan.map((meal) => (
                    <div key={meal.idMeal} className="col-md-3 mb-3">
                        <MealCard meal={meal} />
                    </div>
                ))}
            </Row>
        </div>
    );
});

export default RandomMealsSection;