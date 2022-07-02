import React, { Component } from "react";

class LeaveScreen extends Component {
  state = {
    liveHours: new Date().getHours(),
    liveMinutes: new Date().getMinutes(),
    liveSeconds: new Date().getSeconds(),
    Day: new Date().getDate(),
    Date: new Date().getDate(),
    Month: new Date().getMonth(),
    Year: new Date().getFullYear(),
  };
  render() {
    return <div></div>;
  }
}

export default LeaveScreen;
