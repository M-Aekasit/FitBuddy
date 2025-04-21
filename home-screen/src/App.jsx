import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./components/์Navigation";
import HealthDashboard from "./components/HealthDashboard";
import HealthCalculatorUI from "./components/HealthCalculatorUI";
import Water from "./components/Water";
import SportPage from "./components/SportPage";
import Food from "./components/Food";
import FriendPage from "./components/FriendPage";
import DiaryPage from "./components/DiaryPage";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/HealthDashboard" element={<HealthDashboard />} />
        <Route path="/bmi" element={<HealthCalculatorUI />} />
        <Route path="/water" element={<Water />} />
        <Route path="/sport" element={<SportPage />} />
        <Route path="/food" element={<Food />} />
        <Route path='/FriendPage' element={<FriendPage />} />
        <Route path='/DiaryPage' element={<DiaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;