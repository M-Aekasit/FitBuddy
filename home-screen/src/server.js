import cors from "cors";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";
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
  const { text, createdAt, date, hour, minute, isNew} = req.body;

  if (!text || !createdAt || !date || hour === undefined || minute === undefined|| isNew === undefined) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const notificationCollection = db.collection("notification");

    const exists = await notificationCollection.findOne({
      text,   
      hour,   
      minute  
    });

    if (exists) {
      await client.close();
      return res.status(409).json({ message: "Notification already exists" });
    }

    const createdAtDate = new Date(createdAt);
    createdAtDate.setSeconds(0, 0); 

    await notificationCollection.insertOne({
      text,
      createdAt: createdAtDate, 
      date,
      hour, 
      minute, 
      isNew
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

    // delete same data
    const notifications = await notificationCollection.aggregate([
      {
        $group: {
          _id: { text: "$text", hour: "$hour", minute: "$minute", date: "$date" }, 
          createdAt: { $first: "$createdAt" }, 
          isNew: { $first: "$isNew" }
        }
      },
      {
        $project: { 
          _id: 0,
          text: "$_id.text",
          date: "$_id.date", 
          createdAt: 1,
          hour: "$_id.hour",
          minute: "$_id.minute",
          isNew: 1
        }
      }
    ]).toArray();

    await client.close();
    res.status(200).json(notifications); 
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

    // delete collection "notification"
    await notificationCollection.deleteMany({});

    await client.close();
    res.status(200).json({ message: "All messages cleared from DB." });
  } catch (err) {
    console.error("Failed to clear messages from DB:", err);
    res.status(500).json({ message: "Failed to clear messages from DB." });
  }
});



app.put("/api/notification", async (req, res) => {
  const { text, date, hour, minute, isNew } = req.body;

  if (!text || !date || hour === undefined || minute === undefined) {
    return res.status(400).json({ message: "Missing identifier fields" });
  }

  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const notificationCollection = db.collection("notification");

    const result = await notificationCollection.updateOne(
    { text, date, hour, minute },
    { $set: { isNew } }
  );

    await client.close();

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.json({ message: "Notification updated" });
  } catch (err) {
    console.error("Error updating notification:", err);
    res.status(500).json({ message: "Internal server error" });
  }
  fetch("http://localhost:3000/api/notification")
  .then(res => res.json())
  .then(data => setMessages(data))
  .catch(err => console.error("Failed to reload messages:", err));
});

// check connect
app.get("/", (req, res) => {
  res.send("FitBuddy API is running.");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});