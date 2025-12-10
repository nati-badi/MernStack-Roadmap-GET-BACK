import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    gpa: { type: Number, default: null },
    skills: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
