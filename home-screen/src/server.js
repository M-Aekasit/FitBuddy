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

// POST API Recieve and save data()
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

// check connect
app.get("/", (req, res) => {
  res.send("FitBuddy API is running.");
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});