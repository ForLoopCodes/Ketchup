import React from "react";

export default function Mood() {
  const [moods, setMoods] = React.useState([
    { id: 1, mood: "😐", date: "01-01-2020" },
    { id: 2, mood: "😭", date: "02-01-2020" },
  ]);
  const [dates, setDates] = React.useState(["01-01-2020", "02-01-2020"]);
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
  return (
    <div>
      <h1>Mood</h1>
      <div>
        <h2>How is your mood today?</h2>
        {moods.length === 0 && <p>No moods yet.</p>}
        <button onClick={() => addMood("😂")}>😂</button>
        <button onClick={() => addMood("😊")}>😊</button>
        <button onClick={() => addMood("😐")}>😐</button>
        <button onClick={() => addMood("😡")}>😡</button>
        <button onClick={() => addMood("😭")}>😭</button>
        <button onClick={() => addMood("😢")}>😢</button>
        <button onClick={() => addMood("😞")}>😞</button>
        <button onClick={() => addMood("😟")}>😟</button>
        <button onClick={() => addMood("😴")}>😴</button>
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
                        <button onClick={() => setMood("😂", mood)}>😂</button>
                        <button onClick={() => setMood("😊", mood)}>😊</button>
                        <button onClick={() => setMood("😐", mood)}>😐</button>
                        <button onClick={() => setMood("😡", mood)}>😡</button>
                        <button onClick={() => setMood("😭", mood)}>😭</button>
                        <button onClick={() => setMood("😢", mood)}>😢</button>
                        <button onClick={() => setMood("😞", mood)}>😞</button>
                        <button onClick={() => setMood("😟", mood)}>😟</button>
                        <button onClick={() => setMood("😴", mood)}>😴</button>
                      </font>
                    );
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div>
          <h2>Moods in last 7 entries:</h2>
          <div>
            <p>
              {moods.slice(-7).map((mood) => {
                return <font key={mood.id}>{mood.mood}</font>;
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
