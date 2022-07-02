import React, { Component } from "react";

class Timer extends Component {
  state = {
    h: this.props.h,
    m: this.props.m,
    s: this.props.s,
  };
  start = () => {
    this.timer = setInterval(() => {
      if (this.state.s === 0) {
        if (this.state.m === 0) {
          if (this.state.h === 0) {
            this.setState({ h: 0, m: 0, s: 0 });
          } else {
            this.setState({ h: this.state.h - 1, m: 59, s: 59 });
          }
        } else {
          this.setState({ m: this.state.m - 1, s: 59 });
        }
      } else {
        this.setState({ s: this.state.s - 1 });
      }
    }, 1000);
  };
  stop = () => {
    clearInterval(this.timer);
  };
  reset = () => {
    this.setState({ h: this.props.h, m: this.props.m, s: this.props.s });
  };
  twoD = (x) => {
    return x.toString().padStart(2, "0");
  };
  render() {
    return (
      <div>
        <h1>
          {this.state.h > 0 &&
            this.twoD(this.state.h) + "h and " + this.twoD(this.state.m) + "m."}
          {this.state.h === 0 &&
            this.twoD(this.state.m) + "m and " + this.twoD(this.state.s) + "s."}
          {this.state.h === 0 &&
            this.state.m === 0 &&
            this.state.s === 0 &&
            "Time's up!"}
        </h1>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Timer;
