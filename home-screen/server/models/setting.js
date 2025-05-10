import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    settings: {
      profileImage: String,
      currentPassword: String,
      passwordLastChanged: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Setting", settingSchema);
