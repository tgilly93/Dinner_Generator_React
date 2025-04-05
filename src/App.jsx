import React from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage.jsx';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App
