import express from "express";
import { createSport, getSport } from "../controllers/sportController.js";

const router = express.Router();
router.post("/sport", createSport);
router.get("/sport", getSport);

export default router;
