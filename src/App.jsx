import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MealResult from "./pages/MealResult.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import SearchByLetter from "./pages/SearchByLetter.jsx";
import AreaPage from "./pages/AreaPage.jsx";
import IngredientPage from "./pages/IngredientPage.jsx";
import MealsByCategory from "./pages/MealsByCategory.jsx";
import MealsByIngredient from "./pages/MealsByIngredient.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal" element={<MealResult />} />
        <Route path="/meal/:mealId" element={<MealResult />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/category/:categoryName" element={<MealsByCategory />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/search-by-letter" element={<SearchByLetter />} />
        <Route path="/areas" element={<AreaPage />} />
        <Route path="/ingredients" element={<IngredientPage />} />
        <Route path="/ingredient/:ingredientName" element={<MealsByIngredient />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
