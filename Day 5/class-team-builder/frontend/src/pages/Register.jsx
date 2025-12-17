import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { registerTeacher, registerStudent } from "../api/auth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "teacher",
    name: "",
    email: "",
    password: "",
    gpa: "",
    major: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (form.role === "teacher") {
        await registerTeacher(form);
        // auto-login teacher
        const res = await axios.post(
          "http://localhost:5000/api/auth/teacher/login",
          {
            email: form.email,
            password: form.password,
          }
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.teacher));
        toast.success("✅ Teacher registered & logged in");
        navigate("/teacher/dashboard");
      } else {
        await registerStudent(form);
        // auto-login student
        const res = await axios.post(
          "http://localhost:5000/api/auth/student/login",
          {
            email: form.email,
            password: form.password,
          }
        );
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.student));
        toast.success("✅ Student registered & logged in");
        navigate("/student/dashboard");
      }
    } catch (err) {
      toast.error(
        err.response?.data?.msg || "❌ Server error, please try again later"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-500 text-sm mt-2">
            Register as a teacher or student to start building teams
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setForm({ ...form, role: "teacher" })}
            className={`px-4 py-2 rounded-l-lg border transition-all ${
              form.role === "teacher"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            👩‍🏫 Teacher
          </button>
          <button
            type="button"
            onClick={() => setForm({ ...form, role: "student" })}
            className={`px-4 py-2 rounded-r-lg border transition-all ${
              form.role === "student"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🎓 Student
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          {form.role === "student" && (
            <>
              <Input
                label="GPA"
                name="gpa"
                type="number"
                step="0.01"
                value={form.gpa}
                onChange={handleChange}
              />
              <Input
                label="Major"
                name="major"
                value={form.major}
                onChange={handleChange}
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-gray-100"
                : "bg-gray-900 hover:bg-gray-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-gray-900 font-semibold hover:underline"
            >
              Login here
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Class Team Builder
        </p>
      </div>
    </div>
  );
}
