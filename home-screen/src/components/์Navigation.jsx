import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="flex gap-4 p-4 bg-gray-100">
    <Link to="/HealthDashboard" className="hover:text-blue-500">Home</Link>
    {/* <Link to="/bmi" className="hover:text-blue-500">BMI Calculator</Link> */}

  </nav>
);

export default Navigation;