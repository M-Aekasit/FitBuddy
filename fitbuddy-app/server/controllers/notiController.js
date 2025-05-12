// controllers/notification.controller.js
import Notification from "../models/noti.js";

// POST: Create Notification
export const createNotification = async (req, res) => {
  const { text, createdAt, date, hour, minute, isNewNotification } = req.body;

  if (
    !text ||
    !createdAt ||
    !date ||
    hour === undefined ||
    minute === undefined ||
    isNewNotification === undefined
  ) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const exists = await Notification.findOne({ text, hour, minute });

    if (exists) {
      return res.status(409).json({ message: "Notification already exists" });
    }

    const createdAtDate = new Date(createdAt);
    createdAtDate.setSeconds(0, 0);

    await Notification.create({
      text,
      createdAt: createdAtDate,
      date,
      hour,
      minute,
      isNewNotification,
    });

    res.status(201).json({ message: "Notification saved" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET: Get all notifications with deduplication
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.aggregate([
      {
        $group: {
          _id: {
            text: "$text",
            hour: "$hour",
            minute: "$minute",
            date: "$date",
          },
          createdAt: { $first: "$createdAt" },
          isNewNotification: { $first: "$isNewNotification" },
        },
      },
      {
        $project: {
          _id: 0,
          text: "$_id.text",
          date: "$_id.date",
          createdAt: 1,
          hour: "$_id.hour",
          minute: "$_id.minute",
          isNewNotification: 1,
        },
      },
    ]);

    res.status(200).json(notifications);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE: Delete all notifications
export const deleteNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({});
    res.status(200).json({ message: "All messages cleared from DB." });
  } catch (err) {
    console.error("Failed to clear messages from DB:", err);
    res.status(500).json({ message: "Failed to clear messages from DB." });
  }
};

// PUT: Update `isNewNotification` field of a specific notification
export const updateNotification = async (req, res) => {
  const { text, date, hour, minute, isNewNotification } = req.body;

  if (!text || !date || hour === undefined || minute === undefined) {
    return res.status(400).json({ message: "Missing identifier fields" });
  }

  try {
    const result = await Notification.updateOne(
      { text, date, hour, minute },
      { $set: { isNewNotification } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification updated" });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
