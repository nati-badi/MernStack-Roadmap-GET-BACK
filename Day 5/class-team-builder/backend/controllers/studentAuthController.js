import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerStudent = async (req, res) => {
  try {
    const { fullName, studentId, email, password } = req.body;

    const studentExists = await Student.findOne({ email });
    if (studentExists)
      return res.status(400).json({ msg: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const student = await Student.create({
      fullName,
      studentId,
      email,
      password: hashed,
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
      student: {
        id: student._id,
        fullName: student.fullName,
        studentId: student.studentId,
        email: student.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
