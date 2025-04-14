import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import MealResult from "./pages/MealResult.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal/:id" element={<MealResult />} />
        </Routes>
      <Footer />
    </div>

        
  );
}

export default App;
