import { BrowserRouter, Routes, Route } from "react-router-dom";
import GenerateTeams from "./pages/GenerateTeams";
import StudentRegister from "./pages/StudentRegister";
import TeacherRegister from "./pages/TeacherRegister";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student/register" element={<StudentRegister />} />
        <Route path="/teacher/register" element={<TeacherRegister />} />
        <Route path="/generate-teams" element={<GenerateTeams />} />
      </Routes>
    </BrowserRouter>
  );
}
