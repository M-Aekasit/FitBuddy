import Food from "../models/food.js";

export const createFood = async (req, res) => {
  const { foodName, foodType, calories } = req.body;

  if (!foodName || !foodType || calories === undefined) {
    return res.status(400).json({ message: "Missing food data" });
  }

  try {
    const food = new Food({ foodName, foodType, calories });
    await food.save();
    
    res.status(201).json({ message: "Food saved successfully", id: food._id });
  } catch (err) {
    console.error("Error saving food:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllFood = async (req, res) => {
  try {
    const foods = await Food.find();
    const formatted = foods.map((item) => ({
      _id: item._id,
      foodName: item.foodName,
      foodType: item.foodType,
      calories: item.calories,
      createdAt: item.createdAt.toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
      }),
    }));
    res.json(formatted);
  } catch (err) {
    console.error("Error fetching food:", err);
    res.status(500).json({ message: "Server error" });
  }
};
