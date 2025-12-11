import { useState } from "react";
import Input from "../components/Input";
import { registerTeacher } from "../api/auth";

export default function TeacherRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerTeacher(form);
      setMessage("Teacher registered successfully");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-6 bg-white shadow-lg rounded"
      >
        <h2 className="text-xl font-semibold mb-4">Teacher Registration</h2>

        <Input label="Name" name="name" onChange={handleChange} />
        <Input label="Email" name="email" onChange={handleChange} />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
        >
          Register
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
    </div>
  );
}
