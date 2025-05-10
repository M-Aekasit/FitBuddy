import express from "express";
import {
  saveSettings,
  getSettings,
  getAllSettings,
  deleteSettings,
} from "../controllers/settingsController.js";

const router = express.Router();

router.post("/settings", saveSettings);
router.get("/settings/:userId", getSettings);
router.get("/settings", getAllSettings);
router.delete("/settings/:userId", deleteSettings);

export default router;
