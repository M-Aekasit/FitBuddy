import HealthRecord from "../models/healthRecord.js";

export const saveAllMetrics = async (req, res) => {
  try {
    const {
      weight,
      height,
      age,
      gender,
      bmi,
      bmiCategory,
      bmr,
      tdee,
      activityLevel,
    } = req.body;

    const record = new HealthRecord({
      user: req.user.id, // 🔗 เชื่อมกับผู้ใช้จาก token
      weight,
      height,
      age,
      gender,
      bmi,
      bmiCategory,
      bmr,
      tdee,
      activityLevel,
    });

    await record.save();

    res.status(201).json({ success: true, record });
  } catch (err) {
    console.error("Error saving full health record:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getLatestHealthRecord = async (req, res) => {
  try {
    const userId = req.user.id; // ใช้ user จาก token

    const latestRecord = await HealthRecord.findOne({ user: userId }).sort({
      createdAt: -1,
    });

    if (!latestRecord) {
      return res.status(404).json({ message: "No health record found." });
    }

    res.status(200).json(latestRecord);
  } catch (error) {
    console.error("Error fetching latest health record:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
