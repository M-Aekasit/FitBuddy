// src/components/HealthCalculatorUI.jsx
import React, { useState } from "react";
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
  activityLevels,
  getBmiColor
} from "../utils/HealthCalculatorLogic";

const HealthCalculatorUI = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("1.2");
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const bmiResult = calculateBMI(weight, height);
    const bmrResult = calculateBMR(weight, height, age, gender);

    if (!bmiResult || !bmrResult) {
      alert("Please fill in all fields with valid numbers");
      return;
    }

    setResults({
      bmi: bmiResult.value,
      bmiCategory: bmiResult.category,
      bmr: bmrResult,
      tdee: calculateTDEE(bmrResult, activityLevel)
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Health Calculator</h2>
      
      {/* ส่วน Input ต่างๆ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Weight (kg)</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Height (cm)</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
          />
        </div>
      </div>
      
      {/* ส่วนอายุและเพศ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Age (years)</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Gender</label>
          <select
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      
      {/* ระดับกิจกรรม */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Activity Level</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
          {activityLevels.map(level => (
            <option key={level.value} value={level.value}>{level.label}</option>
          ))}
        </select>
      </div>
      
      {/* ปุ่มคำนวณ */}
      <button 
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 font-bold"
        onClick={handleCalculate}
      >
        Calculate Health Metrics
      </button>
      
      {/* ส่วนแสดงผล */}
      {results && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">BMI Results</h3>
            <p className="text-3xl font-bold text-blue-600">{results.bmi}</p>
            <p className={`mt-1 font-medium ${getBmiColor(results.bmiCategory)}`}>
              {results.bmiCategory}
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Metabolism Results</h3>
            <div className="mb-3">
              <p className="text-sm text-gray-600">Basal Metabolic Rate (BMR)</p>
              <p className="text-2xl font-bold text-purple-600">{results.bmr} kcal/day</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Daily Calorie Needs (TDEE)</p>
              <p className="text-2xl font-bold text-purple-600">{results.tdee} kcal/day</p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Activity level: {activityLevels.find(l => l.value === activityLevel)?.label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthCalculatorUI;