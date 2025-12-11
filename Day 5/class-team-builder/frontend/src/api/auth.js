import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerTeacher = (data) =>
  axios.post(`${API}/teacher/register`, data);

export const registerStudent = (data) =>
  axios.post(`${API}/student/register`, data);
