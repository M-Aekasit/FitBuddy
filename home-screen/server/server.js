import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan"; // ใช้สำหรับ logging
import cors from "cors"; // ใช้สำหรับ CORS

import connectDB from "./config/connectDB.js";
connectDB();

const app = express();
app.use(express.json()); // เพิ่ม middleware เพื่อ parse JSON
app.use(morgan("dev"))
app.use(cors()); // ใช้ CORS เพื่ออนุญาตให้เข้าถึง API จากโดเมนอื่น

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// โหลด route ทั้งหมดในโฟลเดอร์ routes
const Routes = path.join(__dirname, "routes");

if (!fs.existsSync(Routes)) {
  console.error(`Error: Routes directory not found at ${Routes}`);
  process.exit(1);
}

async function loadRoutes() {
  try {
    console.log(`Loading routes from: ${Routes}`);
    const files = fs.readdirSync(Routes);

    for (const file of files) {
      if (file.endsWith(".js")) {
        try {
          const module = await import(`./routes/${file}`);
          app.use("/api", module.default); // Mount route on /api
          console.log(`Route loaded: ${file}`);
        } catch (err) {
          console.error("Error loading routes:", err);
          process.exit(1);
        }
      }
    }

    const PORT = process.env.PORT || 5000; // ใช้ค่าจาก .env
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error("Error loading routes:", err);
    process.exit(1);
  }
}

loadRoutes();
