import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [editForm, setEditForm] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    if (!token || role !== "teacher") {
      toast.error("❌ Unauthorized. Please login as a teacher.");
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      setTeacher(parsedUser);
      setEditForm({ name: parsedUser.name, email: parsedUser.email });

      // Fetch students
      axios
        .get("http://localhost:5000/api/auth/teacher/students", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setStudents(res.data.students))
        .catch(() => toast.error("❌ Error loading students"));
    } catch (error) {
      console.log(error.message);
      toast.error("❌ Error loading teacher data.");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("✅ Logged out successfully");
    navigate("/login");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:5000/api/auth/teacher/${teacher.id}`,
        { name: editForm.name, email: editForm.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTeacher(res.data.teacher);
      localStorage.setItem("user", JSON.stringify(res.data.teacher));
      toast.success("✅ Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.msg || "❌ Error updating profile");
    }
  };

  if (!teacher) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">👩‍🏫 Teacher Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md p-6 space-y-6">
          <nav className="space-y-3">
            <p className="font-semibold text-gray-700">Navigation</p>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              📄 Profile
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              👥 Manage Students
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              🛠 Teams (coming soon)
            </button>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
              🔔 Notifications (coming soon)
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8">
          {/* Welcome */}
          <p className="text-lg text-gray-700">
            Welcome back, <span className="font-semibold">{teacher.name}</span>!
          </p>

          {/* Profile Update */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="mt-1 block w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="mt-1 block w-full border rounded-lg px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Students Grid */}
          <div>
            <h2 className="text-xl font-bold mb-4">Manage Students</h2>
            {students.length === 0 ? (
              <p className="text-gray-500">No students found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {s.name}
                    </h3>
                    <p className="text-gray-700">
                      <span className="font-semibold">Email:</span> {s.email}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">GPA:</span>{" "}
                      {s.gpa || "Not set"}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Major:</span>{" "}
                      {s.major || "Not set"}
                    </p>
                    <button className="mt-4 w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-4 text-sm">
        © {new Date().getFullYear()} Class Team Builder. All rights reserved.
      </footer>
    </div>
  );
}
