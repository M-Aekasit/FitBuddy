import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  foodName: String,
  foodType: String,
  calories: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Food", foodSchema);


