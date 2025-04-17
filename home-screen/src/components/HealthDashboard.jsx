// components/HealthDashboard.js
import React from 'react';

const HealthDashboard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Good morning</h1>
        <p className="text-green-500">You've gain 2kg yesterday keep it up!</p>
      </div>

      {/* Date */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">August 28 2022</h2>

      {/* Health Metrics */}
      <div className="space-y-6">
        {/* Water */}
        <HealthMetric 
          title="Water" 
          value="2100 ml" 
          goal="Daily goal 3.5L" 
          icon="💧"
        />

        {/* Weight */}
        <HealthMetric 
          title="Weight" 
          value="75 kg" 
          goal="Goal 65kg" 
          icon="⚖️"
        />

        {/* Calories */}
        <HealthMetric 
          title="Calories" 
          value="750 kcal" 
          goal="Left 2500 kcal" 
          icon="🔥"
        />

        {/* BPM */}
        <HealthMetric 
          title="BPM" 
          value="105 bpm" 
          goal="Last check 2d" 
          icon="❤️"
        />
      </div>

      <div className="border-t border-gray-200 my-6"></div>

      {/* Today's Meal */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Today's meal</h2>
        <p className="text-blue-500 mb-4">New plan</p>
        
        <h3 className="font-medium text-gray-700 mb-2">Breakfast</h3>
        <p className="text-gray-600">Br</p>
        <p className="text-gray-600">A</p>
      </div>
    </div>
  );
};

const HealthMetric = ({ title, value, goal, icon }) => {
  return (
    <div className="flex items-start">
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <h3 className="font-medium text-gray-700">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
        <p className="text-sm text-gray-500">{goal}</p>
      </div>
    </div>
  );
};

export default HealthDashboard;