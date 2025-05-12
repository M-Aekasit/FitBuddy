import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, required: true },
  date: { type: String, required: true },
  hour: { type: Number, required: true },
  minute: { type: Number, required: true },
  isNewNotification: { type: Boolean, required: true },
});

export default mongoose.model("Notification", notificationSchema);
