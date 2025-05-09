import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import Navigation from "./components/Navigation";
import HealthDashboard from "./components/HealthDashboard";
import HealthCalculatorUI from "./components/HealthCalculatorUI";
import Water from "./components/Water";
import SportPage from "./components/SportPage";
import Food from "./components/Food";
import FriendPage from "./components/FriendPage";
import DiaryPage from "./components/DiaryPage";
import Notification from "./components/Notification";
import SettingPage from "./components/SettingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const AppWrapper = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navigation setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/HealthDashboard" />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/register" element={<RegisterPage />} />

        {isAuthenticated && (
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
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/verify-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.valid) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Token verification failed", err);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <AppWrapper
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </Router>
  );
}

export default App;
