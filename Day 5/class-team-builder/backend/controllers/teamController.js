import Student from "../models/Student.js";

export const generateTeams = async (req, res) => {
  try {
    const { teamSize } = req.body;
    if (!teamSize || teamSize < 2)
      return res.status(400).json({ message: "Team size must be at least 2" });

    const students = await Student.find().sort({ gpa: -1 });

    if (students.length === 0)
      return res.status(400).json({ message: "No students found" });

    const teams = [];
    let team = [];

    // Leaders = highest GPAs
    for (let i = 0; i < students.length; i++) {
      team.push(students[i]);

      if (team.length === teamSize) {
        teams.push(team);
        team = [];
      }
    }

    if (team.length) teams.push(team);

    return res.status(200).json({
      message: "Teams generated successfully",
      teams,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
