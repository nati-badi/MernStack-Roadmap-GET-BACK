import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [editForm, setEditForm] = useState({ gpa: "", major: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    if (!token || role !== "student") {
      toast.error("❌ Unauthorized. Please login as a student.");
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      setStudent(parsedUser);
      setEditForm({ gpa: parsedUser.gpa || "", major: parsedUser.major || "" });
    } catch (error) {
      console.log(error.message);
      toast.error("❌ Error loading student data.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("✅ Logged out successfully");
    navigate("/login");
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/auth/student/${student._id}`,
        { gpa: editForm.gpa, major: editForm.major },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudent(res.data.student);
      localStorage.setItem("user", JSON.stringify(res.data.student));
      toast.success("✅ Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.msg || "❌ Error updating profile");
    }
  };

  if (!student) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🎓 Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 space-y-4">
          <nav className="space-y-2">
            <p className="font-semibold text-gray-700">Navigation</p>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              📄 Profile
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              👥 Teams (coming soon)
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              🔔 Notifications (coming soon)
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Welcome */}
          <p className="text-lg text-gray-700 mb-6">
            Welcome back, <span className="font-semibold">{student.name}</span>!
          </p>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Profile Information</h2>
            <p>
              <span className="font-semibold">Email:</span> {student.email}
            </p>
            <p>
              <span className="font-semibold">GPA:</span>{" "}
              {student.gpa || "Not set"}
            </p>
            <p>
              <span className="font-semibold">Major:</span>{" "}
              {student.major || "Not set"}
            </p>
          </div>

          {/* Profile Update Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="gpa"
                  value={editForm.gpa}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Major
                </label>
                <input
                  type="text"
                  name="major"
                  value={editForm.major}
                  onChange={handleChange}
                  className="mt-1 block w-full border rounded-lg px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Class Team Builder. All rights reserved.
      </footer>
    </div>
  );
}
