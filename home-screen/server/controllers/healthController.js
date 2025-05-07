import User from "../models/usermodel.js";
import {
  calculateBMI,
  calculateBMR,
  calculateTDEE,
} from "../../src/utils/healthLogic.js";

// ฟังก์ชันคำนวณ BMI และอัปเดตลง MongoDB
export const getBMI = async (req, res) => {
  try {
    const { weight, height, age, gender, userId } = req.body;
    console.log("Received body:", req.body);

    if (!weight || !height || !userId) {
      return res.status(400).json({
        error: "Missing required fields: weight, height, or userId",
      });
    }

    const bmiResult = calculateBMI(weight, height);
    if (!bmiResult || isNaN(bmiResult.value)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const updateFields = {
      weight,
      height,
      bmi: bmiResult.value,
    };
    if (age) updateFields.age = age;
    if (gender) updateFields.gender = gender;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });

    res.json({
      bmi: bmiResult.value,
      category: bmiResult.category,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error in getBMI:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ฟังก์ชันคำนวณ BMR และอัปเดตลง MongoDB
export const getBMR = async (req, res) => {
  try {
    const { weight, height, age, gender, userId } = req.body;

    console.log("Received body:", req.body);

    if (!weight || !height || !age || !gender || !userId) {
      return res.status(400).json({
        error:
          "Missing required fields: weight, height, age, gender, or userId",
      });
    }

    const bmr = calculateBMR(weight, height, age, gender);
    if (!bmr) return res.status(400).json({ error: "Invalid input" });

    // 👇 เพิ่มการ update BMR ลง MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bmr: bmr },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ bmr: bmr, user: updatedUser });
  } catch (err) {
    console.error("Error in getBMR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// ฟังก์ชันคำนวณ TDEE และอัปเดตลง MongoDB
export const getTDEE = async (req, res) => {
  try {
    const { bmr, activityLevel, userId } = req.body;

    if (!bmr || !activityLevel || !userId) {
      return res.status(400).json({
        error: "Missing required fields: bmr, activityLevel, or userId",
      });
    }

    const tdee = calculateTDEE(bmr, activityLevel);
    if (!tdee || isNaN(tdee))
      return res.status(400).json({ error: "Invalid input" });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { tdee },
      { new: true }
    );

    res.json({ tdee, user: updatedUser });
  } catch (err) {
    console.error("Error in getTDEE:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
