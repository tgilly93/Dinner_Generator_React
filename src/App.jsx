import React from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import MealResult from './pages/MealResult.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/MealResult" element={<MealResult />} />
      </Routes>
    </Router>
  );
}

export default App
