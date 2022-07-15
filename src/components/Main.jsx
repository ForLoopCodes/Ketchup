import React from "react";
import Timer from "./bases/Timer";
import Tasks from "./bases/Tasks";
import LeaveScreen from "./bases/LeaveScreen";
import Tally from "./bases/Tally";

function Main() {
  return (
    <div className="main">
      <Timer h={0} m={30} s={0} />
      <Tasks />
      <Tally />
      <LeaveScreen />
    </div>
  );
}

export default Main;
