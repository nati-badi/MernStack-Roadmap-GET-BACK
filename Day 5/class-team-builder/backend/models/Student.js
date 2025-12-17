import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // matches frontend "name"
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    gpa: { type: Number, default: null }, // matches frontend "gpa"
    major: { type: String, default: "" }, // matches frontend "major"
    skills: { type: [String], default: [] }, // optional extra field
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);
