import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017"; 
const dbName = "fitbuddyDB"; 

// Middleware
app.use(cors());
app.use(express.json());

// POST API Recieve and save data() sport
app.post("/api/sports", async (req, res) => {
  const { sportType, inputData, calories } = req.body;

  if (!sportType || !inputData || calories === undefined) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const sportsCollection = db.collection("sports");

    const result = await sportsCollection.insertOne({
      sportType,
      inputData,
      calories,
      createdAt: new Date()
    });

    await client.close();
    res.status(201).json({ message: "Saved successfully", id: result.insertedId });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// POST API Recieve and save data() sport noti
app.post("/api/notification", async (req, res) => {
  const { text, createdAt, hour, minute } = req.body;

  if (!text || !createdAt || hour === undefined || minute === undefined) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const notificationCollection = db.collection("notification");

    // ตรวจสอบว่าในฐานข้อมูลมีข้อความที่มีค่า `text`, `hour`, และ `minute` ซ้ำกันหรือไม่
    const exists = await notificationCollection.findOne({
      text,   // ตรวจสอบข้อความ
      hour,   // ตรวจสอบชั่วโมง
      minute  // ตรวจสอบนาที
    });

    // ถ้ามีข้อมูลซ้ำ
    if (exists) {
      await client.close();
      return res.status(409).json({ message: "Notification already exists" });
    }

    // ถ้าไม่มีข้อมูลซ้ำ ให้บันทึกข้อมูลใหม่
    const createdAtDate = new Date(createdAt);
    createdAtDate.setSeconds(0, 0); // กำจัดวินาทีและมิลลิวินาที

    await notificationCollection.insertOne({
      text,
      createdAt: createdAtDate, // บันทึกเวลาที่ปรับแล้ว
      hour, // บันทึกค่า ชั่วโมง
      minute // บันทึกค่า นาที
    });

    await client.close();
    res.status(201).json({ message: "Notification saved" });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//GET data
app.get("/api/notification", async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const notificationCollection = db.collection("notification");

    // ใช้ aggregate เพื่อลบข้อมูลที่ซ้ำกัน
    const notifications = await notificationCollection.aggregate([
      {
        $group: {
          _id: { text: "$text", hour: "$hour", minute: "$minute" }, // ใช้ข้อความ, ชั่วโมง และ นาทีเป็นคีย์ในการกรุ๊ป
          createdAt: { $first: "$createdAt" }, // เอาค่าจากอันแรกที่พบ
        }
      },
      {
        $project: { // คัดเลือกเฉพาะข้อมูลที่ต้องการ
          _id: 0,
          text: "$_id.text",
          createdAt: 1,
          hour: "$_id.hour",
          minute: "$_id.minute",
        }
      }
    ]).toArray();

    await client.close();
    res.status(200).json(notifications); // ส่งข้อมูลที่ไม่ซ้ำกลับไปยัง client
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/notification", async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const notificationCollection = db.collection("notification");

    // ลบข้อมูลทั้งหมดใน collection "notification"
    await notificationCollection.deleteMany({});

    await client.close();
    res.status(200).json({ message: "All messages cleared from DB." });
  } catch (err) {
    console.error("Failed to clear messages from DB:", err);
    res.status(500).json({ message: "Failed to clear messages from DB." });
  }
});

// check connect
app.get("/", (req, res) => {
  res.send("FitBuddy API is running.");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});