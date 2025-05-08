// controllers/diaryController.js
import Diary from "../models/diary.js"; 

export const createDiary = async (req, res) => {
  try {
    const { diaryDate, diaryRate, diaryNote } = req.body;

    if (!diaryDate || diaryRate === undefined || diaryNote === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newDiary = new Diary({ diaryDate, diaryRate, diaryNote });
    await newDiary.save();

    res.status(201).json({
      message: "Diary entry created successfully",
      diary: newDiary,
    });
  } catch (err) {
    console.error("Error saving diary:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getDiary = async (req, res) => {
  try {
    const diaryItems = await Diary.find();
    res.json(diaryItems);
  } catch (err) {
    console.error("Error fetching diary:", err);
    res.status(500).json({ message: "Server error" });
  }
};
