import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import studentAuthRoutes from "./routes/studentAuthRoutes.js";
import teacherAuthRoutes from "./routes/teacherAuthRoutes.js";

import teamRoutes from "./routes/teamRoutes.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/auth/teacher", teacherAuthRoutes);
app.use("/api/auth/student", studentAuthRoutes);
app.use("/api/teams", teamRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
