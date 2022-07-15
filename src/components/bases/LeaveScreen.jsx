import React, { Component } from "react";

class LeaveScreen extends Component {
  state = {
    liveHours: new Date().getHours().toString().padStart(2, "0"),
    liveMinutes: new Date().getMinutes().toString().padStart(2, "0"),
    liveSeconds: new Date().getSeconds().toString().padStart(2, "0"),
    Day: new Date().getDay().toString(),
    Date: new Date().getDate().toString().padStart(2, "0"),
    Month: new Date().getMonth().toString().padStart(2, "0"),
    Year: new Date().getFullYear(),
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        liveHours: new Date().getHours().toString().padStart(2, "0"),
        liveMinutes: new Date().getMinutes().toString().padStart(2, "0"),
        liveSeconds: new Date().getSeconds().toString().padStart(2, "0"),
        Date: new Date().getDate().toString().padStart(2, "0"),
        Month: new Date().getMonth().toString().padStart(2, "0"),
        Year: new Date().getFullYear(),
      });
      switch (new Date().getDay()) {
        default:
          this.setState({ Day: "Error!" });
          break;
        case 0:
          this.setState({ Day: "Sun" });
          break;
        case 1:
          this.setState({ Day: "Mon" });
          break;
        case 2:
          this.setState({ Day: "Tue" });
          break;
        case 3:
          this.setState({ Day: "Wed" });
          break;
        case 4:
          this.setState({ Day: "Thu" });
          break;
        case 5:
          this.setState({ Day: "Fri" });
          break;
        case 6:
          this.setState({ Day: "Sat" });
          break;
      }
    }, 500);
  }
  render() {
    return (
      <div>
        <h1>Live Clock.</h1>
        {this.state.liveHours}:{this.state.liveMinutes}:{this.state.liveSeconds}
        <br />
        {this.state.Day}, {this.state.Date}/{this.state.Month}/{this.state.Year}
      </div>
    );
  }
}

export default LeaveScreen;
