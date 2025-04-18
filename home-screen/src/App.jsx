import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navigation from "./components/์Navigation.jsx";
import HealthDashboard from "./components/HealthDashboard.jsx";
import HealthCalculatorUI from "./components/HealthCalculatorUI.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/HealthDashboard" element={<HealthDashboard />} />
        <Route path="/bmi" element={<HealthCalculatorUI />} /> 
      </Routes>
    </Router>
  );
}

export default App;
