import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({
  weight: Number,
  height: Number,
  age: Number,
  gender: String,
  bmi: Number,
  bmr: Number,
  tdee: Number,
  activityLevel: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const HealthRecord = mongoose.model("HealthRecord", healthRecordSchema);

export default HealthRecord;
