import express from "express";
import {
  registerStudent,
  loginStudent,
  updateStudentProfile,
} from "../controllers/studentAuthController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.put("/:id", protect, updateStudentProfile);

export default router;
