import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
  sportType: String,
  inputData: mongoose.Schema.Types.Mixed, 
  calories: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Sport", sportSchema);


