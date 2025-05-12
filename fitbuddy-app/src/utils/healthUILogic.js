// utils/healthUILogic.js

export const activityLevels = [
    { value: "1.2", label: "Sedentary (little or no exercise)" },
    { value: "1.375", label: "Lightly active (light exercise 1-3 days/week)" },
    {
      value: "1.55",
      label: "Moderately active (moderate exercise 3-5 days/week)",
    },
    { value: "1.725", label: "Very active (hard exercise 6-7 days/week)" },
    { value: "1.9", label: "Extra active (very hard exercise & physical job)" },
  ];
  
  export const getBmiColor = (category) => {
    switch (category) {
      case "Normal weight":
        return "text-green-600";
      case "Underweight":
        return "text-yellow-500";
      case "Overweight":
        return "text-orange-500";
      case "Obese":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };
  