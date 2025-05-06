import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017";
const dbName = "FitBuddy-DataBase"; 

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

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("FitBuddy API is running.");
});

// ********** FOOD TRACKING ENDPOINTS **********
// POST - Save tracking data
// GET - Fetch tracking data

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

// ********** SPORTS TRACKING ENDPOINTS **********

app.post("/api/sport", async (req, res) => {
  const { sportType, inputData, calories } = req.body;

  if (!sportType || !inputData || calories === undefined) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const db = client.db(dbName);
    const sportCollection = db.collection("sport");

    const result = await sportCollection.insertOne({
      sportType,
      inputData,
      calories,
      createdAt: new Date()
    });

    res.status(201).json({ message: "Saved successfully", id: result.insertedId });
  } catch (err) {
    console.error("Database error (sport):", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/sport", async (req, res) => {
  try {
    const db = client.db(dbName);
    const sportCollection = db.collection("sport");
    const sportItems = await sportCollection.find().toArray();
    const formattedSportItems = sportItems.map(item => ({
      _id: item._id,
      sportType: item.sportType,
      inputData: item.inputData,
      calories: item.calories,
      createdAt: new Date(item.createdAt).toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok"
      })
    }));

    res.json(formattedSportItems);
  } catch (err) {
    console.error("Error fetching sport data:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ********** DIARY TRACKING ENDPOINTS **********

app.post("/api/diary", async (req, res) => {
  const { diaryDate, diaryRate, diaryNote } = req.body;

  if (!diaryDate || diaryRate === undefined || diaryNote === undefined){
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const db = client.db(dbName);
    const diaryCollection = db.collection("diary");

    const result = await diaryCollection.insertOne({
      diaryDate,
      diaryRate,
      diaryNote,
    });

    res.status(201).json({ message: "Saved successfully", id: result.insertedId });
  } catch (err) {
    console.error("Database error (diary):", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/diary", async (req, res) => {
  try {
    const db = client.db(dbName);
    const diaryCollection = db.collection("diary");
    const diaryItems = await diaryCollection.find().toArray();
    
    const formattedDiaryItems = diaryItems.map(item => ({
      _id: item._id,
      diaryDate,
      diaryRate,
      diaryNote,
    }));

    res.json(formattedDiaryItems);
  } catch (err) {
    console.error("Error fetching diary data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
