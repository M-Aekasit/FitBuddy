// routes/healthRoutes.js
import express from "express";
import { saveAllMetrics } from "../controllers/healthController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getLatestHealthRecord } from "../controllers/healthController.js";

const router = express.Router();

router.post("/save", verifyToken, saveAllMetrics); 
router.get("/latest", verifyToken, getLatestHealthRecord); // ✅ แก้ไข


export default router;


// import express from "express";
// import { getBMI, getBMR, getTDEE } from "../controllers/healthController.js";

// const router = express.Router();

// router.post("/health/bmi", getBMI);
// router.post("/health/bmr", getBMR);
// router.post("/health/tdee", getTDEE);

// export default router;
