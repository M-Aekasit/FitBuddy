import Setting from "../models/setting.js";

export const saveSettings = async (req, res) => {
  const { userId, settings } = req.body;

  if (!userId || !settings) {
    return res.status(400).json({ message: "Missing required data." });
  }

  try {
    const existing = await Setting.findOne({ userId });

    if (existing) {
      await Setting.updateOne({ userId }, { settings });
      return res.status(200).json({ message: "Settings updated successfully" });
    } else {
      await Setting.create({ userId, settings });
      return res.status(201).json({ message: "Settings created successfully" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

export const getSettings = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Setting.findOne({ userId });
    if (!result) return res.status(404).json({ message: "Not found" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getAllSettings = async (req, res) => {
  try {
    const all = await Setting.find({});
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteSettings = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await Setting.deleteOne({ userId });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
