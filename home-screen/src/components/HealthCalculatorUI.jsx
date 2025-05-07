// src/components/HealthCalculatorUI.jsx
import React, { useState } from "react";
import axios from "axios";
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
} from "../utils/healthLogic.js";

import { activityLevels, getBmiColor } from "../utils/healthUILogic.js";

import { useNavigate } from "react-router-dom";

const HealthCalculatorUI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  const handleCalculate = async () => {
    const bmiResult = calculateBMI(weight, height);
    const bmrResult = calculateBMR(weight, height, age, gender);

    if (!bmiResult || !bmrResult) {
      alert("Please fill in all fields with valid numbers");
      return;
    }

    // คำนวณ TDEE
    const tdeeResult = calculateTDEE(bmrResult, activityLevel);
    console.trace("TDEE CALLED");

    // เรียก API เพื่อบันทึกลง MongoDB
    try {
      await fetch("http://localhost:5000/api/health/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, height, age, gender }),
      });

      await fetch("http://localhost:5000/api/health/bmr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weight, height, age, gender }),
      });

      await fetch("http://localhost:5000/api/health/tdee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bmr: bmrResult, activityLevel }),
      });

      setResults({
        bmi: bmiResult.value,
        bmiCategory: bmiResult.category,
        bmr: bmrResult,
        tdee: tdeeResult,
      });
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  const bmiScale = [
    { label: "Underweight", color: "bg-blue-400", range: [0, 18.5] },
    { label: "Normal", color: "bg-green-400", range: [18.5, 24.9] },
    { label: "Overweight", color: "bg-yellow-400", range: [25, 29.9] },
    { label: "Obese", color: "bg-red-400", range: [30, 100] },
  ];

  const getBmiPosition = (bmi) => {
    if (!bmi) return "0%";
    const maxBMI = 40;
    const position = (bmi / maxBMI) * 100;
    return `${Math.min(position, 100)}%`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 text-gray-800">
      {/* Back Button */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/HealthDashboard")}
          className="px-4 py-2 text-2xl font-bold rounded hover:bg-gray-200"
        >
          ← Back
        </button>
      </div>

      {/* Header */}
      <header className="text-center">
        <h1 className="text-5xl font-bold mb-8">Health Calculator</h1>
      </header>

      {/* Form */}
      <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl p-10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Inputs */}
          {[
            {
              label: "Weight (kg)",
              value: weight,
              setValue: setWeight,
              placeholder: "Enter your weight",
            },
            {
              label: "Height (cm)",
              value: height,
              setValue: setHeight,
              placeholder: "Enter your height",
            },
            {
              label: "Age (years)",
              value: age,
              setValue: setAge,
              placeholder: "Enter your age",
            },
          ].map(({ label, value, setValue, placeholder }) => (
            <div key={label}>
              <label className="block text-gray-700 font-semibold mb-2">
                {label}
              </label>
              <input
                type="number"
                className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Gender
            </label>
            <select
              className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Activity Level */}
        <div className="mb-10">
          <label className="block text-gray-700 font-semibold mb-2">
            Activity Level
          </label>
          <select
            className="w-full px-5 py-3 rounded-full border focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button
          type="button"
          className="w-full py-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white font-bold text-xl shadow-md transition duration-300"
          onClick={handleCalculate}
        >
          Calculate Health Metrics
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="w-full max-w-6xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* BMI Result */}
          <div className="bg-white rounded-3xl p-10 shadow-xl text-center border">
            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              BMI Result
            </h2>
            <p className="text-6xl font-extrabold text-blue-600">
              {results.bmi}
            </p>
            <p
              className={`mt-3 text-2xl font-semibold ${getBmiColor(
                results.bmiCategory
              )}`}
            >
              {results.bmiCategory}
            </p>

            {/* BMI Bar */}
            <div className="mt-8 w-full">
              <div className="relative w-full h-6 rounded-full overflow-hidden bg-gray-200">
                <div className="absolute inset-0 flex">
                  {bmiScale.map((section) => (
                    <div
                      key={section.label}
                      className={`${section.color} flex-1`}
                      style={{
                        width: `${
                          (section.range[1] - section.range[0]) * 2.5
                        }%`,
                      }}
                    />
                  ))}
                </div>
                {/* Marker */}
                <div
                  className="absolute top-0 left-0 h-6 w-1 bg-black"
                  style={{ left: getBmiPosition(results.bmi) }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Underweight</span>
                <span>Normal</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
            </div>
          </div>

          {/* Metabolism Results */}
          <div className="bg-white rounded-3xl p-10 shadow-xl text-center border">
            <h2 className="text-3xl font-bold text-red-700 mb-6">Metabolism</h2>

            <div className="mb-8">
              <p className="text-gray-600 text-md mb-2">
                Basal Metabolic Rate (BMR)
              </p>
              <p className="text-5xl font-extrabold text-red-700">
                {results.bmr} kcal/day
              </p>
              <p className="mt-2 text-sm text-gray-500">
                BMR is the number of calories your body needs to maintain basic
                functions like breathing and keeping warm while at rest.
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-md mb-2">
                Daily Calorie Needs (TDEE)
              </p>
              <p className="text-5xl font-extrabold text-red-700">
                {results.tdee} kcal/day
              </p>
              <p className="mt-2 text-sm text-gray-500">
                TDEE is your estimated daily calorie burn including your
                exercise level (
                {activityLevels.find((l) => l.value === activityLevel)?.label}).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthCalculatorUI;
