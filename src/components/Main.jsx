import React, { Component } from "react";
import Timer from "./bases/Timer";
import Tasks from "./bases/Tasks";
import LeaveScreen from "./bases/LeaveScreen";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <Timer h={1} m={0} s={5}></Timer>
        <Tasks></Tasks>
        <LeaveScreen></LeaveScreen>
      </div>
    );
  }
}

export default Main;
