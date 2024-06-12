import { useState, useEffect } from "react";
import "./Editor.scss";

const apiUrl = "/api/data";
export const Editor = () => {
  const [scores, setScores] = useState([]);
  const [name, setName] = useState("");
  const [tech, setTech] = useState("");
  const [time, setTime] = useState("");

  const fetchScores = async () => {
    const response = await fetch(apiUrl);
    if (response?.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        setScores(data);
      }
    }
  };

  useEffect(() => {
    void fetchScores();
  }, []);

  const handleAddScore = async () => {
    const newScore = {
      id: scores?.length + 1,
      name,
      time,
      tech,
    };

    const postScores = async () => {
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newScore),
      });

      await fetchScores();
      setName("");
      setTech("");
      setTime("");
    };
    void postScores();
  };

  const handleDeleteScore = async (scoreId) => {
    const deleteScore = { id: scoreId };
    const deleteScores = async () => {
      await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteScore),
      });

      await fetchScores();
      setName("");
      setTech("");
    };
    void deleteScores();
  };

  return (
    <div className="editor">
      <h1>Scoreboard</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* <input
          type="text"
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        /> */}
        <select
          placeholder="Score"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        >
          <option key="default" value="">
            -
          </option>
          <option key="cplusplus" value="C++">
            C++
          </option>
          <option key="Dotnet" value="Dotnet">
            Dotnet
          </option>
          <option key="go" value="Go">
            Go
          </option>
          <option key="java" value="Java">
            Java
          </option>
          <option key="javascript" value="JavaScript">
            JavaScript
          </option>
          <option key="perl" value="Perl">
            Perl
          </option>
          <option key="python" value="Python">
            Python
          </option>
          <option key="ruby" value="Ruby">
            Ruby
          </option>
        </select>
        <button
          className={"add-score " + (!name || !tech ? "disabled" : " ")}
          onClick={handleAddScore}
          disabled={!name || !tech}
        >
          Add Score
        </button>
      </div>
      <ul>
        {scores.map((s, index) => (
          <li key={s.id}>
            <span>
              [{index}] {s.name} {">"} {s.tech}{" "}
            </span>
            <button onClick={() => handleDeleteScore(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
