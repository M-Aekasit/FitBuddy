import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  name: String,
  sender: String,
  date: { type: Date, default: Date.now },
  calories: {
    burned: Number,
    target: Number,
  },
  water: {
    consumed: Number,
    target: Number,
  },
});

export default mongoose.model("Friend", friendSchema);
