import express from "express";
import {
  registerTeacher,
  loginTeacher,
  updateTeacherProfile,
} from "../controllers/teacherAuthController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { getAllStudents } from "../controllers/studentAuthController.js";

const router = express.Router();

router.post("/register", registerTeacher);
router.post("/login", loginTeacher);
router.put("/:id", protect, updateTeacherProfile);
router.get("/students", protect, getAllStudents);

export default router;
