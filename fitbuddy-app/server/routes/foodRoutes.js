import express from "express";
import { createFood, getAllFood } from "../controllers/foodController.js";

const router = express.Router();

router.post("/food", createFood);
router.get("/food", getAllFood);

export default router;
