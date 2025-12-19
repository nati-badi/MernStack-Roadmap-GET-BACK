import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, gpa, major } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists)
      return res.status(400).json({ msg: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashed,
      gpa,
      major,
    });

    res.json({ msg: "Student registered", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, student.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      student,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.id !== id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const { gpa, major } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      { gpa, major },
      { new: true }
    );

    if (!student) return res.status(404).json({ msg: "Student not found" });

    res.json({ student });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
