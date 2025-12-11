import express from "express";
const router = express.Router();
import { generateTeams } from "../controllers/teamController.js";

router.post("/generate", generateTeams);

export default router;
