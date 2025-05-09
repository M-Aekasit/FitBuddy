import express from "express"
import cors from "cors"
import { MongoClient } from "mongodb"

const app = express()
const port = 5001 // ใช้พอร์ตที่แตกต่างจาก water-server
const mongoUrl = "mongodb://localhost:27017"
const dbName = "fitbuddyDB" // ใช้ฐานข้อมูลเดียวกับ water-server

// Middleware
app.use(cors())
app.use(express.json({ limit: "50mb" })) // เพิ่ม limit สำหรับการอัปโหลดรูปภาพ

// Middleware สำหรับ logging
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const logBody = { ...req.body }
    // ถ้ามีรูปภาพ ให้ลบออกจาก log เพื่อไม่ให้ log ยาวเกินไป
    if (logBody.settings && logBody.settings.profileImage) {
      logBody.settings.profileImage = "[BASE64_IMAGE]"
    }
    console.log(`📝 ${req.method} Request to ${req.path}:`, logBody)
  }
  next()
})

// API สำหรับบันทึกการตั้งค่า
app.post("/api/settings", async (req, res) => {
  const { userId, settings } = req.body

  console.log("📥 Received settings data:", {
    userId,
    settings: { ...settings, profileImage: settings.profileImage ? "[BASE64_IMAGE]" : undefined },
  })

  if (!userId || !settings) {
    console.log("❌ Missing required data")
    return res.status(400).json({ message: "Missing required data. userId and settings are required." })
  }

  try {
    console.log("🔄 Connecting to MongoDB...")
    const client = new MongoClient(mongoUrl)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(dbName)
    const settingsCollection = db.collection("settings")

    // ตรวจสอบว่ามีการตั้งค่าของผู้ใช้นี้อยู่แล้วหรือไม่
    const existingSettings = await settingsCollection.findOne({ userId })

    let result
    if (existingSettings) {
      // ถ้ามีข้อมูลอยู่แล้ว ให้อัปเดต
      result = await settingsCollection.updateOne({ userId }, { $set: { settings, updatedAt: new Date() } })
      console.log("✅ Settings updated:", result)
    } else {
      // ถ้ายังไม่มีข้อมูล ให้สร้างใหม่
      result = await settingsCollection.insertOne({
        userId,
        settings,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log("✅ Settings created:", result.insertedId)
    }

    await client.close()
    res.status(200).json({
      message: existingSettings ? "Settings updated successfully" : "Settings created successfully",
      result,
    })
  } catch (err) {
    console.error("❌ Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
  }
})

// API สำหรับดึงการตั้งค่า
app.get("/api/settings/:userId", async (req, res) => {
  const { userId } = req.params

  console.log("🔍 Fetching settings for user:", userId)

  if (!userId) {
    console.log("❌ Missing userId")
    return res.status(400).json({ message: "Missing userId" })
  }

  try {
    console.log("🔄 Connecting to MongoDB...")
    const client = new MongoClient(mongoUrl)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(dbName)
    const settingsCollection = db.collection("settings")

    const userSettings = await settingsCollection.findOne({ userId })

    await client.close()

    if (userSettings) {
      console.log("✅ Settings found:", {
        ...userSettings,
        settings: {
          ...userSettings.settings,
          profileImage: userSettings.settings.profileImage ? "[BASE64_IMAGE]" : undefined,
        },
      })
      res.status(200).json(userSettings)
    } else {
      console.log("⚠️ No settings found for user:", userId)
      res.status(404).json({ message: "Settings not found for this user" })
    }
  } catch (err) {
    console.error("❌ Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
  }
})

// API สำหรับดึงการตั้งค่าทั้งหมด (สำหรับ admin)
app.get("/api/settings", async (req, res) => {
  try {
    console.log("🔄 Fetching all settings...")
    const client = new MongoClient(mongoUrl)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(dbName)
    const settingsCollection = db.collection("settings")

    const allSettings = await settingsCollection.find({}).toArray()

    await client.close()
    console.log(`✅ Found ${allSettings.length} settings records`)
    res.status(200).json(allSettings)
  } catch (err) {
    console.error("❌ Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
  }
})

// API สำหรับลบการตั้งค่า
app.delete("/api/settings/:userId", async (req, res) => {
  const { userId } = req.params

  console.log("🗑️ Deleting settings for user:", userId)

  if (!userId) {
    console.log("❌ Missing userId")
    return res.status(400).json({ message: "Missing userId" })
  }

  try {
    console.log("🔄 Connecting to MongoDB...")
    const client = new MongoClient(mongoUrl)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(dbName)
    const settingsCollection = db.collection("settings")

    const result = await settingsCollection.deleteOne({ userId })

    await client.close()

    if (result.deletedCount > 0) {
      console.log("✅ Settings deleted successfully")
      res.status(200).json({ message: "Settings deleted successfully" })
    } else {
      console.log("⚠️ No settings found to delete")
      res.status(404).json({ message: "Settings not found for this user" })
    }
  } catch (err) {
    console.error("❌ Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
  }
})

// API สำหรับเปลี่ยนรหัสผ่าน
app.post("/api/settings/password", async (req, res) => {
  const { userId, oldPassword, newPassword, timestamp } = req.body

  console.log("📥 Received password change request:", { userId, timestamp })

  if (!userId || !oldPassword || !newPassword) {
    console.log("❌ Missing required data")
    return res
      .status(400)
      .json({ message: "Missing required data. userId, oldPassword, and newPassword are required." })
  }

  try {
    console.log("🔄 Connecting to MongoDB...")
    const client = new MongoClient(mongoUrl)
    await client.connect()
    console.log("✅ Connected to MongoDB")

    const db = client.db(dbName)
    const passwordHistoryCollection = db.collection("passwordHistory")

    // บันทึกประวัติการเปลี่ยนรหัสผ่าน
    const historyResult = await passwordHistoryCollection.insertOne({
      userId,
      oldPassword: "********", // ไม่เก็บรหัสผ่านเดิมจริงเพื่อความปลอดภัย
      newPassword: newPassword, // เก็บรหัสผ่านใหม่ (ในระบบจริงควรเข้ารหัส)
      changedAt: new Date(),
      timestamp,
    })

    console.log("✅ Password history saved:", historyResult.insertedId)

    // อัปเดตข้อมูลในคอลเลกชัน settings (ถ้ามี)
    const settingsCollection = db.collection("settings")
    const settingsResult = await settingsCollection.updateOne(
      { userId },
      {
        $set: {
          "settings.passwordLastChanged": new Date(),
          "settings.currentPassword": newPassword, // เก็บรหัสผ่านปัจจุบัน
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    await client.close()
    res.status(200).json({
      message: "Password changed successfully",
      historyId: historyResult.insertedId,
      settingsUpdated: settingsResult.modifiedCount > 0 || settingsResult.upsertedCount > 0,
    })
  } catch (err) {
    console.error("❌ Database error:", err)
    res.status(500).json({ message: "Server error: " + err.message })
  }
})

// Check connection
app.get("/", (req, res) => {
  res.send("Settings API is running.")
})

// Start server
app.listen(port, () => {
  console.log(`Settings server running at http://localhost:${port}`)
})
