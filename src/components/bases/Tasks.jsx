import React, { Component } from "react";

class Tasks extends Component {
  state = {
    tasks: [
      {
        id: 1,
        name: "Open the Fridge.",
        done: false,
        subTasks: [
          { id: 1, name: "Touch the door.", done: false },
          { id: 2, name: "Hold it.", done: false },
        ],
      },
      {
        id: 2,
        name: "Pick some food.",
        done: false,
        subTasks: [
          { id: 1, name: "Touch the door.", done: false },
          { id: 2, name: "Hold it.", done: false },
        ],
      },
      { id: 3, name: "Eat it.", done: false, subTasks: [] },
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
        {
          id: this.state.tasks.length + 1,
          name: e.target.value,
          done: false,
          subTasks: [],
        },
      ],
    });
  };
  addSubTask = (e) => {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        e.target.alt === task.id.toString() &&
          (task.subTasks = [
            ...task.subTasks,
            { id: task.subTasks.length + 1, name: e.target.value, done: false },
          ]);
        return task;
      }),
    });
  };
  deleteSubTask = (id, e) => {
    this.setState({
      tasks: this.state.tasks.map((task) => {
        e === task.id &&
          (task.subTasks = task.subTasks.filter(
            (subTask) => subTask.id !== id
          ));
        return task;
      }),
    });
  };
  checkSubEntry = (e) => {
    if (e.keyCode === 13) {
      e.target.value !== "" && this.addSubTask(e);
    }
  };
  checkEntry = (e) => {
    if (e.keyCode === 13) {
      e.target.value !== "" && this.addTask(e);
    }
  };
  render() {
    return (
      <div>
        <h1>Tasks.</h1>
        <input
          type="text"
          placeholder={"Type and press enter to add task."}
          onKeyDown={this.checkEntry}
        />
        <br />
        <ul type="disc">
          {this.state.tasks.map((task) => (
            <li key={task.id}>
              <button onClick={() => this.deleteTask(task.id)}>Done</button>
              {task.name}
              <br />
              <input
                type="text"
                alt={task.id}
                onKeyDown={this.checkSubEntry}
                placeholder={"Type and press enter to add sub task."}
              />
              <ul type="circle">
                {task.subTasks.map((subTask) => (
                  <li key={subTask.id}>
                    <button
                      onClick={() => this.deleteSubTask(subTask.id, task.id)}
                    >
                      Done
                    </button>
                    {subTask.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Tasks;
