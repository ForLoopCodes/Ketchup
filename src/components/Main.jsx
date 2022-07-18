import React from "react";
import Timer from "./bases/Timer";
import Tasks from "./bases/Tasks";
import LeaveScreen from "./bases/LeaveScreen";
import Tally from "./bases/Tally";

function Main() {
  return (
    <div className="main">
      <Timer h={0} m={30} s={0} />
      <Tasks
        tasks={[
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
        ]}
      />
      <Tally />
      <LeaveScreen />
    </div>
  );
}

export default Main;
