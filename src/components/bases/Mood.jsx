import React, { useEffect } from "react";
import axios from "axios";

export default function Mood() {
  const [moods, setMoods] = React.useState([]);
  const [dates, setDates] = React.useState(["01-01-2020", "02-01-2020"]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/moods")
      .then((response) => {
        setMoods(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);
  const returnMoodOfDate = (date) => {
    return moods.filter((mood) => mood.date === date);
  };
  const addMood = (e) => {
    if (
      !dates.includes(
        `${new Date().getDate().toString().padStart(2, "0")}-${(
          new Date().getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${new Date().getFullYear()}`
      )
    ) {
      setMoods([
        ...moods,
        {
          id: moods.length + 1,
          mood: e,
          date: `${new Date().getDate().toString().padStart(2, "0")}-${(
            new Date().getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}-${new Date().getFullYear()}`,
        },
      ]);
      setDates([
        ...dates,
        `${new Date().getDate().toString().padStart(2, "0")}-${(
          new Date().getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${new Date().getFullYear()}`,
      ]);
    } else {
      alert("You already added a mood for today, rather reset it!");
    }
  };
  const setMood = (e, mood) => {
    setMoods(
      moods.map((m) => {
        if (m.id === mood.id) {
          return {
            ...m,
            mood: e,
          };
        }
        return m;
      })
    );
  };
  const lastSeven = () => {
    const lastSeven = moods.slice(-7).map((mood) => {
      return [mood.mood];
    });
    let points = 0;
    for (let i = 0; i < lastSeven.length; i++) {
      lastSeven[i][0] === "Happy Pro Max" && (points += 5);
      lastSeven[i][0] === "Happy Lite" && (points += 3);
      lastSeven[i][0] === "IDK" && (points += 1);
      lastSeven[i][0] === "ANGRY!!!" && (points -= 5);
      lastSeven[i][0] === "Sed Lyf" && (points -= 3);
      lastSeven[i][0] === "Sad" && (points -= 2);
      lastSeven[i][0] === "Zzz..." && (points += 0);
    }
    let avgPoints = points / lastSeven.length;
    let avgMood = "";
    avgPoints.toFixed(2) < -1 &&
      avgPoints.toFixed(2) >= -2 &&
      (avgMood = "Sad");
    avgPoints.toFixed(2) < -2 &&
      avgPoints.toFixed(2) >= -3 &&
      (avgMood = "Sed Lyf");
    avgPoints.toFixed(2) < -3 && (avgMood = "ANGRY!!!");
    avgPoints.toFixed(2) >= -1 &&
      avgPoints.toFixed(2) <= 1.5 &&
      (avgMood = "IDK");
    avgPoints.toFixed(2) > 1.5 &&
      avgPoints.toFixed(2) <= 3 &&
      (avgMood = "Happy Lite");
    avgPoints.toFixed(2) > 3 && (avgMood = "Happy Pro Max");
    return (
      <p>
        Total points:
        {" " + points}
        <br />
        Average:
        {" " + avgPoints.toFixed(0)}
        <br />
        Average Mood:
        {" " + avgMood}
      </p>
    );
  };
  return (
    <div>
      <h1>Mood.</h1>
      <div>
        <h2>How is your mood today?</h2>
        {moods.length === 0 && <p>No moods yet.</p>}
        <button onClick={() => addMood("Happy Pro Max")}>Happy Pro Max</button>
        <button onClick={() => addMood("Happy Lite")}>Happy Lite</button>
        <button onClick={() => addMood("IDK")}>IDK</button>
        <button onClick={() => addMood("ANGRY!!!")}>ANGRY!!!</button>
        <button onClick={() => addMood("Sed Lyf")}>Sed Lyf</button>
        <button onClick={() => addMood("Sad")}>Sad</button>
        <button onClick={() => addMood("Zzz...")}>Zzz...</button>
        {dates.map((date) => {
          return (
            <div key={date}>
              <div>
                <p>
                  {date + " "}
                  {returnMoodOfDate(date).map((mood) => {
                    return (
                      <font key={mood.id}>
                        {mood.mood}
                        <button onClick={() => setMood("Happy Pro Max", mood)}>
                          Happy Pro Max
                        </button>
                        <button onClick={() => setMood("Happy Lite", mood)}>
                          Happy Lite
                        </button>
                        <button onClick={() => setMood("IDK", mood)}>
                          IDK
                        </button>
                        <button onClick={() => setMood("ANGRY!!!", mood)}>
                          ANGRY!!!
                        </button>
                        <button onClick={() => setMood("Sed Lyf", mood)}>
                          Sed Lyf
                        </button>
                        <button onClick={() => setMood("Sad", mood)}>
                          Sad
                        </button>
                        <button onClick={() => setMood("Zzz...", mood)}>
                          Zzz...
                        </button>
                      </font>
                    );
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div>
          <h2>Average mood in last 7 entries:</h2>
          <div>
            <div>{lastSeven()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
