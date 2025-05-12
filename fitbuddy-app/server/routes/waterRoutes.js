// water.routes.js
import express from "express";
import {
  saveWater,
  getWaterHistory,
  getTodayWaterCount,
} from "../controllers/waterController.js";

const router = express.Router();

router.post("/water", saveWater);
router.get("/history", getWaterHistory);
router.get("/today", getTodayWaterCount);

export default router;
