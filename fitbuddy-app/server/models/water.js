// water.model.js
import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
  waterCount: { type: Number, required: true },
  action: { type: String, required: true },
  timestamp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Water = mongoose.model("Water", waterSchema);

export default Water;
