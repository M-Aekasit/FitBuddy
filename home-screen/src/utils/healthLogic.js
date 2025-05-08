const calculateBMI = (weight, height) => {
  const w = parseFloat(weight);
  const h = parseFloat(height) / 100;

  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return null;

  const bmiValue = parseFloat((w / (h * h)).toFixed(1));
  let category = "";

  if (bmiValue < 18.5) category = "Underweight";
  else if (bmiValue < 25) category = "Normal weight";
  else if (bmiValue < 30) category = "Overweight";
  else category = "Obese";

  return { value: bmiValue, category };
};


// คำนวณ BMR (อัตราการเผาผลาญพื้นฐาน)
const calculateBMR = (weight, height, age, gender) => {
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);
  if (!w || !h || !a) return null;

  return gender === "male"
    ? Math.round(10 * w + 6.25 * h - 5 * a + 5)
    : Math.round(10 * w + 6.25 * h - 5 * a - 161);
};

const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

// คำนวณ TDEE (พลังงานที่ใช้ต่อวัน)
const calculateTDEE = (bmr, activityLevel) => {
  const b = parseFloat(bmr);
  let multiplier = activityMultipliers[activityLevel?.toLowerCase()];

  if (!multiplier && !isNaN(activityLevel)) {
    multiplier = parseFloat(activityLevel);
  }

  if (!b || !multiplier) return null;
  return Math.round(b * multiplier);
};

export { calculateBMI, calculateBMR, calculateTDEE };
