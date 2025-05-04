import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;
const mongoUrl = "mongodb://localhost:27017";
const dbName = "FitBuddy-DataBase";

// MongoDB client instance
const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

async function connectDB() {
  if (!client.isConnected()) {
    await client.connect();
  }
}

connectDB().then(() => console.log("Connected to MongoDB"));


// Middleware
app.use(cors());
app.use(express.json());

// POST endpoint to save food tracking data
app.post("/api/food", async (req, res) => {
    const { foodName, foodType, calories } = req.body;
  
    console.log("Received data:", req.body); 
    
    if (!foodName || !foodType || calories === undefined) {
      return res.status(400).json({ message: "Missing data" });
    }
  
    try {
      await client.connect();
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


// Test route
app.get("/api/food", async (req, res) => {
    try {
      await client.connect();
      const db = client.db(dbName);
      const foodCollection = db.collection("food");
  
      const foodItems = await foodCollection.find().toArray();
  
      // Format the createdAt date for readability
      const formattedFoodItems = foodItems.map(item => {
        return {
          ...item,
          createdAt: item.createdAt.toLocaleString() // Convert to a more readable format
        };
      });
  
      res.json(formattedFoodItems);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Server error" });
    }
});
  
  

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
