import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

// Setup
const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017";
const dbName = "FitBuddy-DataBase"; // Unified database name

// MongoDB client
const client = new MongoClient(mongoUrl);

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.send("FitBuddy API is running.");
});

/**
 * FOOD TRACKING ENDPOINTS
 */

// POST - Save food tracking data
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
    console.error("Database error (food):", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET - Fetch food tracking data
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
    console.error("Error fetching food data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * SPORTS TRACKING ENDPOINTS
 */
let sportsCollection;

app.use(cors());

client.connect().then(() => {
  const db = client.db("FitBuddy-DataBase");
  sportsCollection = db.collection("sport");
  console.log("Connected to MongoDB");
});

// POST - Save sports activity data
app.post("/api/sports", async (req, res) => {
  const { sportType, inputData, calories } = req.body;
  try {
    const result = await sportsCollection.insertOne({
      sportType,
      inputData,
      calories,
      createdAt: new Date(),
    });
    res.status(201).send({ message: "Data saved", id: result.insertedId });
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).send({ error: "Failed to save sport data" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
