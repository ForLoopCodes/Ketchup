import React, { Component } from "react";

class Tally extends Component {
  state = {
    tallies: [
      { id: 1, val: 1, name: "Tally 1" },
      { id: 2, val: 5, name: "Tally 2" },
      { id: 3, val: 10, name: "Tally 3" },
    ],
  };
  minusCount = (id) => {
    this.setState({
      tallies: this.state.tallies.map((tally) => {
        if (tally.id === id) {
          tally.val > 0 && tally.val--;
        }
        return tally;
      }),
    });
  };
  deleteTally = (id) => {
    this.setState({
      tallies: this.state.tallies.filter((tally) => tally.id !== id),
    });
  };
  addCount = (id) => {
    this.setState({
      tallies: this.state.tallies.map((tally) => {
        if (tally.id === id) {
          tally.val++;
        }
        return tally;
      }),
    });
  };
  newTally = (e) => {
    this.setState({
      tallies: [
        ...this.state.tallies,
        {
          id: this.state.tallies.length + 1,
          val: 0,
          name: e.target.value,
        },
      ],
    });
  };
  tallyInputCheck = (e) => {
    if (e.keyCode === 13) {
      e.target.value !== "" && this.newTally(e);
    }
  };
  render() {
    return (
      <div>
        <h1>Tally.</h1>
        <ul>
          {this.state.tallies.map((tally) => (
            <li key={tally.id}>
              {tally.name}
              <button onClick={() => this.minusCount(tally.id)}>-</button>
              {tally.val}
              <button onClick={() => this.addCount(tally.id)}>+</button>
              <button onClick={() => this.deleteTally(tally.id)}>X</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown={this.tallyInputCheck}
          placeholder="Type and press enter to add tally."
        />
      </div>
    );
  }
}

export default Tally;
