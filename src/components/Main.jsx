import React from "react";
import Timer from "./bases/Timer";
import Tasks from "./bases/Tasks";
import LeaveScreen from "./bases/LeaveScreen";
import Tally from "./bases/Tally";
import Expenses from "./bases/Expenses";
import Mood from "./bases/Mood";

function Main() {
  const [moods] = React.useState([
    { id: 1, mood: "IDK", date: "01-01-2020" },
    { id: 2, mood: "Sed Lyf", date: "02-01-2020" },
  ]);
  const [expenses] = React.useState([
    {
      id: 1,
      name: "Rent",
      amount: 1000,
      category: "monthly",
      date: "01-01-2020",
    },
    {
      id: 2,
      name: "Milk",
      amount: 100,
      category: "daily",
      date: "01-02-2020",
    },
    {
      id: 3,
      name: "Lambo",
      amount: 10,
      category: "daily",
      date: "01-01-2020",
    },
    {
      id: 4,
      name: "Bread",
      amount: 10000,
      category: "daily",
      date: "01-02-2020",
    },
  ]);
  const [tallies] = React.useState([
    { id: 1, category: "home", val: 1, name: "Tally 1" },
    { id: 2, category: "other", val: 5, name: "Tally 2" },
    { id: 3, category: "work", val: 10, name: "Tally 3" },
  ]);
  const [tasks] = React.useState([
    {
      id: 1,
      category: "work",
      name: "Open the Fridge.",
      done: false,
      subTasks: [
        { id: 1, name: "Touch the door.", done: false },
        { id: 2, name: "Hold it.", done: false },
      ],
    },
    {
      id: 2,
      category: "work",
      name: "Pick some food.",
      done: false,
      subTasks: [
        { id: 1, name: "Touch the door.", done: false },
        { id: 2, name: "Hold it.", done: false },
      ],
    },
    {
      id: 3,
      category: "home",
      name: "Eat it.",
      done: false,
      subTasks: [],
    },
  ]);
  return (
    <div className="main">
      <Mood moods={moods} />
      <hr />
      <Expenses expenses={expenses} />
      <hr />
      <Timer h={0} m={30} s={0} />
      <hr />
      <Tally tallies={tallies} />
      <hr />
      <Tasks tasks={tasks} />
      <hr />
      <LeaveScreen />
    </div>
  );
}

export default Main;
