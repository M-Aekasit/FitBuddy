import express from "express";
import { getBMI, getBMR, getTDEE } from "../controllers/healthController.js";

const router = express.Router();

router.post("/health/bmi", getBMI);
router.post("/health/bmr", getBMR);
router.post("/health/tdee", getTDEE);


export default router;
