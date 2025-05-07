// ฟังก์ชันคำนวณ BMI และอัปเดตลง MongoDB
import HealthRecord from "../models/healthRecord.js";
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
} from "../../src/utils/healthLogic.js";

// 📌 1. คำนวณ BMI และบันทึกลง Mongo
export const getBMI = async (req, res) => {
  try {
    const { weight, height, age, gender } = req.body;

    if (!weight || !height) {
      return res.status(400).json({ error: "Missing weight or height" });
    }

    const bmiResult = calculateBMI(weight, height);
    if (!bmiResult || isNaN(bmiResult.value)) {
      return res.status(400).json({ error: "Invalid BMI input" });
    }

    const record = new HealthRecord({
      weight,
      height,
      age,
      gender,
      bmi: bmiResult.value,
    });

    await record.save();

    res.json({
      bmi: bmiResult.value,
      category: bmiResult.category,
      record,
    });
  } catch (err) {
    console.error("Error in getBMI:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 2. คำนวณ BMR และบันทึกลง Mongo
export const getBMR = async (req, res) => {
  try {
    const { weight, height, age, gender } = req.body;

    if (!weight || !height || !age || !gender) {
      return res.status(400).json({
        error: "Missing required fields: weight, height, age, or gender",
      });
    }

    const bmr = calculateBMR(weight, height, age, gender);
    if (!bmr) return res.status(400).json({ error: "Invalid BMR input" });

    const record = new HealthRecord({
      weight,
      height,
      age,
      gender,
      bmr,
    });

    await record.save();

    res.json({ bmr, record });
  } catch (err) {
    console.error("Error in getBMR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// 📌 3. คำนวณ TDEE และบันทึกลง Mongo
export const getTDEE = async (req, res) => {
  try {
    const { bmr, activityLevel } = req.body;

    if (!bmr || !activityLevel) {
      return res.status(400).json({
        error: "Missing required fields: bmr or activityLevel",
      });
    }

    const tdee = calculateTDEE(bmr, activityLevel);
    if (!tdee || isNaN(tdee))
      return res.status(400).json({ error: "Invalid TDEE input" });

    const record = new HealthRecord({
      bmr,
      activityLevel,
      tdee,
    });

    await record.save();

    res.json({ tdee, record });
  } catch (err) {
    console.error("Error in getTDEE:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
