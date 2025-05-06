// คำนวณ BMI และจัดหมวดหมู่
const calculateBMI = (weight, height) => {
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
const calculateBMR = (weight, height, age, gender) => {
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);
  if (!w || !h || !a) return null;

  return gender === "male"
    ? (10 * w + 6.25 * h - 5 * a + 5).toFixed(0)
    : (10 * w + 6.25 * h - 5 * a - 161).toFixed(0);
};

// คำนวณ TDEE (พลังงานที่ใช้ต่อวัน)
const calculateTDEE = (bmr, activityLevel) => {
  return (bmr * parseFloat(activityLevel)).toFixed(0);
};
// Export สำหรับ ESM (frontend)
export { calculateBMI, calculateBMR, calculateTDEE };

