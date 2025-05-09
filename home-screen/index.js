import express from "express"
import cors from "cors"
import waterServer from "./water-server.js"
import settingServer from "./setting-server.js"

const app = express()
const port = 5000

// Middleware
app.use(cors())
app.use(express.json({ limit: "50mb" }))

// ใช้ water-server และ setting-server
app.use(waterServer)
app.use(settingServer)

// Check connection
app.get("/", (req, res) => {
  res.send("FitBuddy API is running.")
})

// Start server
app.listen(port, () => {
  console.log(`FitBuddy server running at http://localhost:${port}`)
})
