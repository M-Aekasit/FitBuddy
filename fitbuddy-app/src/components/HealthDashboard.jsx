import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  fetchWaterHistoryFromServer,
  processWaterHistoryData,
  getTodayWaterCount,
  fetchWaterGoalFromServer,
} from "../utils/WaterCalculations";

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
    <div className="flex items-center space-x-4 mb-6">
      <div className="text-4xl">{icon}</div>
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800 tracking-wide">
          {title}
        </h3>
        <p className="text-lg font-bold tracking-wider">{value}</p>
        <p className="text-sm text-gray-500 tracking-wide">{goal}</p>
      </div>
    </div>
    {progress !== undefined && (
      <div className="w-full bg-gray-200 rounded-full h-3">
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

const today = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

const HealthDashboard = () => {
  const [results, setResults] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const [waterCurrent, setWaterCurrent] = useState(0);
  const [waterGoal, setWaterGoal] = useState(8);
  const [isLoading, setIsLoading] = useState(true);

  const userId = "user123"; // Replace this with actual user ID in real app

  // Load water data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const serverData = await fetchWaterHistoryFromServer();
        const processed = processWaterHistoryData(serverData);
        const todayCount = getTodayWaterCount(processed);
        setWaterCurrent(todayCount);

        const goal = await fetchWaterGoalFromServer(userId);
        setWaterGoal(goal);
      } catch (err) {
        console.error("Failed to load water data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [userId]);

  // Load BMI data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/latest", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setBmi(data.bmi);
      setBmiCategory(data.bmiCategory);
    };
    fetchData();
  }, []);

  // Food
  const todayFoodKey = `foodCalories_${new Date().toISOString().split("T")[0]}`;
  const storedFoodCalories = parseInt(localStorage.getItem(todayFoodKey));
  const foodCurrent = !isNaN(storedFoodCalories) ? storedFoodCalories : 0;
  const foodGoal = 2000;

  // Sport
  const todaySportKey = `sportCalories_${new Date().toISOString().split("T")[0]}`;
  const storedSportCalories = parseInt(localStorage.getItem(todaySportKey));
  const exerciseCurrent = !isNaN(storedSportCalories) ? storedSportCalories : 0;
  const exerciseGoal = 850;

  const getBmiPosition = (bmi) => {
    if (!bmi) return "0%";
    const maxBMI = 40;
    const position = (bmi / maxBMI) * 100;
    return `${Math.min(position, 100)}%`;
  };

  return (
    <div className="p-4  mx-auto space-y-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="mb-4 text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">Good Afternoon</h1>
        <p className="text-green-500 mt-1 text-lg">
          You've gained 2kg yesterday, keep it up!
        </p>
      </header>

      {/* Date */}
      <p className="text-sm text-gray-500 -mt-4">{today}</p>

      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        <HealthMetric
          title="Food Tracker"
          value={`${foodCurrent} / ${foodGoal} kcal`}
          goal={`${Math.round((foodCurrent / foodGoal) * 100)}% of daily goal`}
          progress={Math.min((foodCurrent / foodGoal) * 100, 100)}
          color="#f87171"
          icon="🍎"
          link="/food"
          className="p-8"
        />
        <HealthMetric
          title="Water Intake"
          value={
            isLoading
              ? "Loading..."
              : `${waterCurrent} / ${waterGoal} glasses`
          }
          goal={
            isLoading
              ? "Loading..."
              : `${Math.round((waterCurrent / waterGoal) * 100)}% of daily goal`
          }
          progress={
            isLoading
              ? 0
              : Math.min((waterCurrent / waterGoal) * 100, 100)
          }
          color="#3b82f6"
          icon="💧"
          link="/water"
          className="p-8"
        />
        <HealthMetric
          title="Exercise"
          value={`${exerciseCurrent} / ${exerciseGoal} kcal`}
          goal={`${Math.round(
            (exerciseCurrent / exerciseGoal) * 100
          )}% of daily goal`}
          progress={Math.min((exerciseCurrent / exerciseGoal) * 100, 100)}
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
          <p className="text-3xl font-bold text-green-600">
            {bmi !== null ? bmi.toFixed(1) : "--"}
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
              style={{
                width: bmi !== null ? getBmiPosition(bmi) : "0%",
              }}
            />
          </div>
          <div className="flex justify-between text-m text-gray-500">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
          </div>
        </div>
      </Link>

      {/* Meal Plan */}
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
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              Lunch
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Grilled chicken salad - 450 kcal</li>
            </ul>
          </div>
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
