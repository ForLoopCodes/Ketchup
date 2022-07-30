import React from "react";
import Timer from "./bases/Timer";
import Tasks from "./bases/Tasks";
import LeaveScreen from "./bases/LeaveScreen";
import Tally from "./bases/Tally";
import Expenses from "./bases/Expenses";
import Mood from "./bases/Mood";

export default function Main() {
  return (
    <div className="main">
      <Mood />
      <hr />
      <Expenses />
      <hr />
      <Timer h={0} m={30} s={0} />
      <hr />
      <Tally />
      <hr />
      <Tasks />
      <hr />
      <LeaveScreen />
    </div>
  );
}
