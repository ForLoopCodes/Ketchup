import React, { Component } from "react";
import { useRef } from "react";

class Tasks extends Component {
  // tasks app
  state = {
    tasks: [
      { id: 1, name: "Open the Fridge.", done: false },
      { id: 2, name: "Pick some food.", done: false },
      { id: 3, name: "Eat it.", done: false },
    ],
  };
  deleteTask = (id) => {
    this.setState({
      tasks: this.state.tasks.filter((task) => task.id !== id),
    });
  };
  addTask = (e) => {
    this.setState({
      tasks: [
        ...this.state.tasks,
        { id: this.state.tasks.length + 1, name: e.target.value, done: false },
      ],
    });
    console.log(this.state.tasks);
  };
  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <input type="text" onDoubleClick={this.addTask} />
        <ul>
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              {task.name}
              <button onClick={() => this.deleteTask(task.id)}>Done</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Tasks;
