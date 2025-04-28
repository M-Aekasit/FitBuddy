import React from "react";
import { Link } from "react-router-dom";

// HealthMetric component
const HealthMetric = ({
  title,
  value,
  goal,
  progress,
  icon,
  color,
  link = "#",
  className = "",
}) => (
  <Link
    to={link}
    className={`flex flex-col justify-between rounded-xl shadow-sm hover:shadow-md transition-all bg-white ${className}`}
  >
    <div className="flex items-center space-x-6 mb-6"> {/* เล่ม space-x */}
      <div className="text-4xl">{icon}</div> {/* เล่มขนาดไอคอน */}
      <div className="space-y-2"> {/* เล่มระยะห่างระหว่างข้อความ */}
        <h3 className="text-2xl font-semibold text-gray-800 tracking-wide">{title}</h3>
        <p className="text-lg font-bold tracking-wider">{value}</p>
        <p className="text-sm text-gray-500 tracking-wide">{goal}</p>
      </div>
    </div>
    {progress !== undefined && (
      <div className="w-full bg-gray-200 rounded-full h-3"> {/* เล่มความสูงของ progress bar */}
        <div
          className="h-3 rounded-full transition-all"
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
    <div className="p-6  mx-auto space-y-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-6 text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">Good Afternoon</h1>
        <p className="text-green-500 mt-1 text-lg">
          You've gained 2kg yesterday, keep it up!
        </p>
      </header>

      {/* Date */}
      <p className="text-sm text-gray-500 -mt-4">{today}</p>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"> {/* เล่ม gap ระหว่างการ์ด */}
        <HealthMetric
          title="Food Tracker"
          value={`${foodCurrent} / ${foodGoal} kcal`}
          goal={`${Math.round((foodCurrent / foodGoal) * 100)}% of daily goal`}
          progress={(foodCurrent / foodGoal) * 100}
          color="#f87171"
          icon="🍎"
          link="/food"
          className="p-8" // เล่ม padding ให้กรอบใหญ่
        />
        <HealthMetric
          title="Water Intake"
          value={`${waterCurrent} / ${waterGoal} L`}
          goal={`${Math.round(
            (waterCurrent / waterGoal) * 100
          )}% of daily goal`}
          progress={(waterCurrent / waterGoal) * 100}
          color="#3b82f6"
          icon="💧"
          link="/water"
          className="p-8"
        />
        <HealthMetric
          title="Exercise"
          value={`${exerciseCurrent} / ${exerciseGoal} mins`}
          goal={`${Math.round(
            (exerciseCurrent / exerciseGoal) * 100
          )}% of daily goal`}
          progress={(exerciseCurrent / exerciseGoal) * 100}
          color="#fb923c"
          icon="🏃‍♂️"
          link="/sport"
          className="p-8"
        />
      </div>

      {/* BMI Section */}
      <Link
        to="/bmi"
        className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 space-y-4 h-44"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">BMI</h2>
          <p className="text-3xl font-bold text-green-600">22.5</p>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
              style={{ width: "50%" }}
            />
          </div>
          <div className="flex justify-between text-m text-gray-500">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
          </div>
        </div>
      </Link>

      {/* Today's Meal Plan */}
      <section className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Today's Meal Plan
          </h2>
          <p className="text-blue-500 font-medium text-sm">
            Your planned meals for today
          </p>
        </div>

        <div className="space-y-6 divide-y divide-gray-100">
          {/* Breakfast */}
          <div className="pt-4 first:pt-0">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Breakfast
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Oatmeal with fruits - 320 kcal</li>
              <li>Protein shake - 180 kcal</li>
            </ul>
          </div>

          {/* Lunch */}
          <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Lunch
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Grilled chicken salad - 450 kcal</li>
            </ul>
          </div>

          {/* Dinner */}
          <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Dinner
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Salmon with vegetables - 520 kcal</li>
            </ul>
          </div>
        </div>

        <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md">
          Add Meal
        </button>
      </section>
    </div>
  );
};

export default HealthDashboard;
