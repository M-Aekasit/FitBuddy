// authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { body } from "express-validator";

const router = express.Router();

const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

const validateLogin = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// ✅ เพิ่ม endpoint ตรวจสอบ token
router.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

export default router;
