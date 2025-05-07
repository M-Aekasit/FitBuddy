import express from "express";
import { getBMI, getBMR, getTDEE } from "../controllers/healthController.js";

const router = express.Router();

router.post("/bmi", getBMI);
router.post("/bmr", getBMR);
router.post("/tdee", getTDEE);

export default router;
