import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"

const app = express()
const port = 5000
const mongoUrl = "mongodb://localhost:27017"
const dbName = "fitbuddyDB"

// Middleware
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  if (req.method === "POST") {
    console.log("📝 Request Body:", req.body)
  }
  next()
})

// POST API to receive and save water data
app.post("/api/water", async (req, res) => {
  const { waterCount, action, timestamp } = req.body

  console.log("📥 Received water data:", { waterCount, action, timestamp })

  if (waterCount === undefined || !action || !timestamp) {
    console.log("❌ Missing required data")
    return res.status(400).json({ message: "Missing required data" })
  }

  try {
    console.log("🔄 Connecting to MongoDB...")
    const client = new MongoClient(mongoUrl)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(dbName)
    const waterCollection = db.collection("water")

    const result = await waterCollection.insertOne({
      waterCount,
      action,
      timestamp,
      createdAt: new Date(),
    })

    console.log("✅ Data saved to MongoDB:", result.insertedId)
    await client.close()
    res.status(201).json({ message: "Water data saved successfully", id: result.insertedId })
  } catch (err) {
    console.error("❌ Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
  }
})

// GET API to retrieve water history
app.get("/api/water/history", async (req, res) => {
  try {
    console.log("🔄 Fetching water history...")
    const client = new MongoClient(mongoUrl)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(dbName)
    const waterCollection = db.collection("water")

    // Get water history for the last 30 days (increased from 7 to get more data)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const waterHistory = await waterCollection
      .find({ createdAt: { $gte: thirtyDaysAgo } })
      .sort({ createdAt: -1 })
      .toArray()

    console.log(`✅ Found ${waterHistory.length} water history records`)
    await client.close()
    res.status(200).json(waterHistory)
  } catch (err) {
    console.error("❌ Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
  }
})

// GET API to retrieve today's water count
app.get("/api/water/today", async (req, res) => {
  try {
    const client = new MongoClient(mongoUrl)
    await client.connect()
    const db = client.db(dbName)
    const waterCollection = db.collection("water")

    // Get today's start and end
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    // Find the latest water entry for today
    const latestWaterEntry = await waterCollection
      .find({ createdAt: { $gte: today, $lt: tomorrow } })
      .sort({ createdAt: -1 })
      .limit(1)
      .toArray()

    await client.close()

    if (latestWaterEntry.length > 0) {
      res.status(200).json({ waterCount: latestWaterEntry[0].waterCount })
    } else {
      res.status(200).json({ waterCount: 0 })
    }
  } catch (err) {
    console.error("Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
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
