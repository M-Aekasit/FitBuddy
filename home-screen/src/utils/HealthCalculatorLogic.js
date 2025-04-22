// src/utils/HealthCalculatorLogic.js

// คำนวณ BMI และจัดหมวดหมู่
export const calculateBMI = (weight, height) => {
  const w = parseFloat(weight);
  const h = parseFloat(height) / 100;
  if (!w || !h) return null;

  const bmiValue = (w / (h * h)).toFixed(1);
  let category = "";

  if (bmiValue < 18.5) category = "Underweight";
  else if (bmiValue < 25) category = "Normal weight";
  else if (bmiValue < 30) category = "Overweight";
  else category = "Obese";

  return { value: bmiValue, category };
};

// คำนวณ BMR (อัตราการเผาผลาญพื้นฐาน)
export const calculateBMR = (weight, height, age, gender) => {
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);
  if (!w || !h || !a) return null;

  return gender === "male"
    ? (10 * w + 6.25 * h - 5 * a + 5).toFixed(0)
    : (10 * w + 6.25 * h - 5 * a - 161).toFixed(0);
};

// คำนวณ TDEE (พลังงานที่ใช้ต่อวัน)
export const calculateTDEE = (bmr, activityLevel) => {
  return (bmr * parseFloat(activityLevel)).toFixed(0);
};

// ระดับกิจกรรมต่างๆ
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

// กำหนดสีตามหมวดหมู่ BMI
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
