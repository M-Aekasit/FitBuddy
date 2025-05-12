import Sport from "../models/sport.js";

export const createSport = async (req, res) => {
  try {
    const { sportType, inputData, calories } = req.body;

    // Validate required fields
    if (!sportType || !inputData || !calories) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create a new sport entry
    const newSport = new Sport({
      sportType,
      inputData,
      calories,
      createdAt: new Date(),
    });

    // Save the sport entry to the database
    await newSport.save();

    res
      .status(201)
      .json({ message: "Sport entry created successfully", sport: newSport });
  } catch (err) {
    console.error("Error saving sport:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSport = async (_, res) => {
  try {
    const sportItems = await Sport.find();
    const formattedSportItems = sportItems.map((item) => ({
      _id: item._id,
      sportType: item.sportType,
      inputData: item.inputData,
      calories: item.calories,
      createdAt: new Date(item.createdAt).toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
      }),
    }));

    res.json(formattedSportItems);
  } catch (err) {
    console.error("Error fetching sport date:", err);
    res.status(500).json({ message: "Server error" });
  }
};
