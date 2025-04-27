import React from "react";
import { Link } from "react-router-dom";

// HealthMetric component
const HealthMetric = ({ title, value, goal, progress, icon, color, link = "#" }) => (
  <Link
    to={link}
    className="flex flex-col justify-between p-5 rounded-xl shadow-sm hover:shadow-md transition-all bg-white"
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-base font-bold">{value}</p>
        <p className="text-sm text-gray-500">{goal}</p>
      </div>
    </div>
    {progress !== undefined && (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all"
          style={{
            width: `${progress}%`,
            backgroundColor: color,
          }}
        />
      </div>
    )}
  </Link>
);

const HealthDashboard = () => {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Data
  const foodCurrent = 1200;
  const foodGoal = 2000;

  const waterCurrent = 2.1;
  const waterGoal = 3.5;

  const exerciseCurrent = 30;
  const exerciseGoal = 60;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">Good Afternoon</h1>
        <p className="text-green-500 mt-1">You've gained 2kg yesterday, keep it up!</p>
      </div>

      {/* Date */}
      <p className="text-sm text-gray-500">{today}</p>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <HealthMetric
          title="Food Tracker"
          value={`${foodCurrent} / ${foodGoal} kcal`}
          goal={`${Math.round((foodCurrent / foodGoal) * 100)}% of daily goal`}
          progress={(foodCurrent / foodGoal) * 100}
          color="#f87171"
          icon="🍎"
          link="/food"
        />
        <HealthMetric
          title="Water Intake"
          value={`${waterCurrent} / ${waterGoal} L`}
          goal={`${Math.round((waterCurrent / waterGoal) * 100)}% of daily goal`}
          progress={(waterCurrent / waterGoal) * 100}
          color="#3b82f6"
          icon="💧"
          link="/water"
        />
        <HealthMetric
          title="Exercise"
          value={`${exerciseCurrent} / ${exerciseGoal} mins`}
          goal={`${Math.round((exerciseCurrent / exerciseGoal) * 100)}% of daily goal`}
          progress={(exerciseCurrent / exerciseGoal) * 100}
          color="#fb923c"
          icon="🏃‍♂️"
          link="/sport"
        />
      </div>

      {/* BMI Section */}
      <Link to="/health-calculator" className="block bg-white p-6 rounded-xl shadow space-y-4 hover:shadow-md transition-all">
        <h2 className="text-xl font-bold text-gray-800">BMI</h2>
        <p className="text-2xl font-bold text-green-600">22.5</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-green-500"
            style={{ width: "50%" }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Underweight</span>
          <span>Normal</span>
          <span>Overweight</span>
        </div>
      </Link>

      {/* Today's Meal Plan */}
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Today's Meal Plan</h2>
          <p className="text-blue-500 font-semibold text-sm">Your planned meals for today</p>
        </div>

        <div className="space-y-6">
          {/* Breakfast */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Breakfast</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Oatmeal with fruits - 320 kcal</li>
              <li>Protein shake - 180 kcal</li>
            </ul>
          </div>

          {/* Lunch */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Lunch</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Grilled chicken salad - 450 kcal</li>
            </ul>
          </div>

          {/* Dinner */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Dinner</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Salmon with vegetables - 520 kcal</li>
            </ul>
          </div>
        </div>

        <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition">
          Add Meal
        </button>
      </div>
    </div>
  );
};

export default HealthDashboard;
