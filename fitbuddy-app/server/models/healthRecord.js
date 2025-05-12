import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weight: Number,
  height: Number,
  age: Number,
  gender: String,
  bmi: Number,
  bmiCategory: String,
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
