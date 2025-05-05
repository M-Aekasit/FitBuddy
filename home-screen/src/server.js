import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017";
const dbName = "FitBuddy-DataBase";

// Create MongoDB client (no deprecated options needed)
const client = new MongoClient(mongoUrl);

async function connectDB() {
  try {
    await client.connect(); // Just connect — no need to check isConnected()
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint to save food tracking data
app.post("/api/food", async (req, res) => {
  const { foodName, foodType, calories } = req.body;

  if (!foodName || !foodType || calories === undefined) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const db = client.db(dbName);
    const foodCollection = db.collection("food");

    const result = await foodCollection.insertOne({
      foodName,
      foodType,
      calories,
      createdAt: new Date()
    });

    res.status(201).json({ message: "Saved successfully", id: result.insertedId });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET endpoint to fetch food tracking data
app.get("/api/food", async (req, res) => {
  try {
    const db = client.db(dbName);
    const foodCollection = db.collection("food");

    const foodItems = await foodCollection.find().toArray();

    const formattedFoodItems = foodItems.map(item => ({
      _id: item._id,
      foodName: item.foodName,
      foodType: item.foodType,
      calories: item.calories,
      createdAt: new Date(item.createdAt).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok"
      })
    }));
    

    res.json(formattedFoodItems);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
