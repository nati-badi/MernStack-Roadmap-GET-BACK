import { useState } from "react";

export default function GenerateTeams() {
  const [teamSize, setTeamSize] = useState("");
  const [teams, setTeams] = useState([]);

  const handleGenerate = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/teams/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamSize: Number(teamSize) }),
    });

    const data = await res.json();
    if (res.ok) setTeams(data.teams);
    else alert(data.message);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h2>Generate Teams</h2>

      <form onSubmit={handleGenerate}>
        <input
          type="number"
          placeholder="Team Size"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          required
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            background: "black",
            color: "white",
          }}
        >
          Generate
        </button>
      </form>

      {teams.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Teams</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 shadow-md rounded-xl p-4"
              >
                <h4 className="text-lg font-bold mb-3">Team {idx + 1}</h4>

                <div className="flex flex-col gap-3">
                  {team.map((student, sIdx) => (
                    <div
                      key={student._id || sIdx}
                      className={`p-3 rounded-lg ${
                        sIdx === 0
                          ? "bg-black text-white"
                          : "bg-gray-100 border border-gray-300 text-black"
                      }`}
                    >
                      <p className="font-semibold">
                        {student.name || "Unknown"}
                        {sIdx === 0 && (
                          <span className="ml-2 text-sm font-normal opacity-80">
                            (Leader)
                          </span>
                        )}
                      </p>

                      <p className="text-sm">GPA: {student.gpa || "—"}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
