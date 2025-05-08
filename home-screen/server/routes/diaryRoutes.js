import express from "express";
import { createDiary, getDiary } from "../controllers/diaryController.js";

const router = express.Router();

router.post("/diary", createDiary);
router.get("/diary", getDiary);

export default router;