// water.controller.js
import Water from "../models/water.js";

// POST /api/water
export const saveWater = async (req, res) => {
  const { waterCount, action, timestamp } = req.body;

  if (waterCount === undefined || !action || !timestamp) {
    return res.status(400).json({ message: "Missing required data" });
  }

  try {
    const newWater = new Water({ waterCount, action, timestamp });
    const savedWater = await newWater.save();
    res
      .status(201)
      .json({ message: "Water data saved successfully", id: savedWater._id });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// GET /api/water/history
export const getWaterHistory = async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const waterHistory = await Water.find({
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 });

    res.status(200).json(waterHistory);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// GET /api/water/today
export const getTodayWaterCount = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const latestEntry = await Water.findOne({
      createdAt: { $gte: today, $lt: tomorrow },
    }).sort({ createdAt: -1 });

    res.status(200).json({ waterCount: latestEntry?.waterCount || 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
