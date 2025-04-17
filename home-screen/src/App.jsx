import { useState } from "react";
import "./App.css";

import HealthDashboard from "./components/HealthDashboard.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <HealthDashboard />
    </>
  );
}

export default App;
