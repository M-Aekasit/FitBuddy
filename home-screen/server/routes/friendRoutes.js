import express from "express";
import {
  createFriend,
  getFriendSummary,
} from "../controllers/friendController.js";

const router = express.Router();
router.post("/friend", createFriend);
router.get("/friend", getFriendSummary);

export default router;
