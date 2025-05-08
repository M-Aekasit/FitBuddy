import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navigation from "./components/Navigation";
// import LoginPage from "./components/LoginPage";
import HealthDashboard from "./components/HealthDashboard";
import HealthCalculatorUI from "./components/HealthCalculatorUI";
import Water from "./components/Water";
import SportPage from "./components/SportPage";
import Food from "./components/Food";
import FriendPage from "./components/FriendPage";
import DiaryPage from "./components/DiaryPage";
import Notification from "./components/Notification";
import SettingPage from "./components/SettingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Navigate to="/HealthDashboard" replace />} />
        <>
          <Route path="/HealthDashboard" element={<HealthDashboard />} />
          <Route path="/bmi" element={<HealthCalculatorUI />} />
          <Route path="/water" element={<Water />} />
          <Route path="/sport" element={<SportPage />} />
          <Route path="/food" element={<Food />} />
          <Route path="/FriendPage" element={<FriendPage />} />
          <Route path="/DiaryPage" element={<DiaryPage />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/SettingPage" element={<SettingPage />} />
          <Route
            path="/HealthDashboard"
            element={<Navigate to="/HealthDashboard" />}
          />
        </>
      </Routes>
    </Router>
  );
}

export default App;
