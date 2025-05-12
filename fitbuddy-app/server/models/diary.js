// models/diary.js
import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
  diaryDate: String,
  diaryRate: Number,
  diaryNote: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Diary", diarySchema);
