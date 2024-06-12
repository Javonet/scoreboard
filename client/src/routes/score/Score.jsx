import PropTypes from "prop-types";
import "./Score.scss";
import { Logo } from "../../components/Logo/Logo";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

function parseTimeString(timeString) {
  // Split the input string by colon
  let [hours, minutes, seconds] = timeString.split(":").map(Number);

  // Create a new Date object for the current date
  let date = new Date();

  // Set the time parts of the date object
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(0); // Optionally set milliseconds to zero

  return date;
}

export default function Score() {
  const [scores, setScores] = useState([]);
  const [searchParams] = useSearchParams();

  // Get a specific query parameter
  const tab = Number(searchParams.get("tab"));

  const startRange = isNaN(tab) || tab === 0 ? 0 : (tab - 1) * 10;
  const endRange = isNaN(tab) || tab === 0 ? 10 : tab * 10;

  const slicedScores = useMemo(() => {
    if (scores?.length > 0) {
      return [scores[0], ...scores.slice(startRange + 1, endRange)];
    }
  }, [startRange, endRange, scores]);

  useEffect(() => {
    const apiCall = async () => {
      const response = await fetch("/api/data");
      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data)) {
          const sortedAllScores = data.sort((a, b) => {
            const bt = parseTimeString(b.time);
            const at = parseTimeString(a.time);

            return at - bt;
          });

          setScores(sortedAllScores);
        }
      }
    };

    void apiCall();

    const intervalId = setInterval(apiCall, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="scoreboard">
      <header>
        <h2>
          <Logo />
          Speed of Integration Challenge
        </h2>
      </header>
      <div className="table">
        <div className="row heading">
          <span className="place heading">Place</span>
          <span className="name heading">Name</span>
          {/* <span className="time heading">Time</span> */}
          <span className="tech heading">Technology</span>
        </div>

        {Array.isArray(slicedScores)
          ? slicedScores.map((score, index) => {
              return (
                <div
                  className={"row " + (index === 0 ? "first" : "")}
                  key={index}
                >
                  <span className="place">{index + 1}</span>
                  <span className="name">{score.name}</span>
                  {/* <span className="time">{score.time}</span> */}
                  <span className="tech">{score.tech}</span>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}

Score.propTypes = {
  scores: PropTypes.array,
};
