import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"

const app = express()
const port = 3001 // Using a different port from the sport server
const mongoUrl = "mongodb://localhost:27017"
const dbName = "fitbuddyDB" // Using the same database as sport

// Middleware
app.use(cors())
app.use(express.json())

// POST API to receive and save water data
app.post("/api/water", async (req, res) => {
  const { waterCount, action, timestamp } = req.body

  if (waterCount === undefined || !action || !timestamp) {
    return res.status(400).json({ message: "Missing required data" })
  }

  try {
    const client = new MongoClient(mongoUrl)
    await client.connect()
    const db = client.db(dbName)
    const waterCollection = db.collection("water")

    const result = await waterCollection.insertOne({
      waterCount,
      action,
      timestamp,
      createdAt: new Date(),
    })

    await client.close()
    res.status(201).json({ message: "Water data saved successfully", id: result.insertedId })
  } catch (err) {
    console.error("Database error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// GET API to retrieve water history
app.get("/api/water/history", async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl)
    await client.connect()
    const db = client.db(dbName)
    const waterCollection = db.collection("water")

    // Get water history for the last 7 days
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const waterHistory = await waterCollection
      .find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ createdAt: -1 })
      .toArray()

    await client.close()
    res.status(200).json(waterHistory)
  } catch (err) {
    console.error("Database error:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// Check connection
app.get("/", (req, res) => {
  res.send("Water Tracker API is running.")
})

// Start server
app.listen(port, () => {
  console.log(`Water Tracker server running at http://localhost:${port}`)
})
