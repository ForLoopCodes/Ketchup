import React from "react";

export default function Tasks(props) {
  const [tasks, setTasks] = React.useState(props.tasks);
  const [categories, setCategories] = React.useState(["other", "work", "home"]);
  const addTask = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          category: "",
          name: e.target.value,
          done: false,
          subTasks: [],
        },
      ]);
    }
  };
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const renameTask = (e, taskid) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTasks(
        tasks.map((task) => {
          taskid === task.id && (task.name = e.target.value);
          return task;
        })
      );
    }
  };
  const doneTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return task;
      })
    );
  };
  const addSubTask = (e, taskid) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTasks(
        tasks.map((task) => {
          taskid === task.id &&
            (task.subTasks = [
              ...task.subTasks,
              {
                id: task.subTasks.length + 1,
                name: e.target.value,
                done: false,
              },
            ]);
          return task;
        })
      );
    }
  };
  const deleteSubTask = (id, e) => {
    setTasks(
      tasks.map((task) => {
        e === task.id &&
          (task.subTasks = task.subTasks.filter(
            (subTask) => subTask.id !== id
          ));
        return task;
      })
    );
  };
  const renameSubTask = (e, subtaskid, taskid) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTasks(
        tasks.map((task) => {
          if (task.id === taskid) {
            task.subTasks.map((subtask) => {
              if (subtask.id === subtaskid) {
                subtask.name = e.target.value;
              }
              return subtask;
            });
          }
          return task;
        })
      );
    }
  };
  const doneSubTask = (subtaskid, taskid) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskid) {
          task.subTasks.map((subtask) => {
            if (subtask.id === subtaskid) {
              subtask.done = !subtask.done;
            }
            return subtask;
          });
        }
        return task;
      })
    );
  };
  const returnTaskOfCaterory = (category) => {
    return tasks.filter((task) => task.category === category);
  };
  const addTaskOfCategory = (e, category) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTasks([
        ...tasks,
        {
          id: tasks.length + 1,
          category: category,
          name: e.target.value,
          done: false,
          subTasks: [],
        },
      ]);
    }
  };
  const addCategory = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      if (categories.indexOf(e.target.value) === -1) {
        setCategories([...categories, e.target.value]);
      } else {
        alert("Category already exists.");
      }
    }
  };
  const deleteCategory = (category) => {
    setCategories(categories.filter((c) => c !== category));
    setTasks(
      tasks.map((task) => {
        if (task.category === category) {
          task.category = "other";
        }
        return task;
      })
    );
  };
  const moveTask = (taskid, category) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskid) {
          task.category = category;
        }
        return task;
      })
    );
  };
  return (
    <div>
      <h1>Tasks.</h1>
      <div>
        <h2>All Tasks | ({tasks.length} Tasks.)</h2>
        <input type="text" placeholder={"Add task..."} onKeyDown={addTask} />
        <br />
        <p>{tasks.length === 0 && "You don't have any tasks yet!"}</p>
        <ul type="disc">
          {tasks.map((task) => (
            <li key={task.id} style={{ opacity: task.done && 0.5 }}>
              <button onClick={() => doneTask(task.id)}>
                {task.done ? "✅" : "⏹️"}
              </button>
              <button onClick={() => deleteTask(task.id)}>🗑️</button>
              <input
                type="text"
                onKeyDown={(e) => renameTask(e, task.id)}
                placeholder={"Rename..."}
              />
              <select
                onChange={(e) => moveTask(task.id, e.target.value)}
                value={task.category}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {task.name}
              <br />
              <input
                type="text"
                onKeyDown={(e) => addSubTask(e, task.id)}
                placeholder={"Add sub task..."}
              />
              <ul type="circle">
                {task.subTasks.map((subTask) => (
                  <li key={subTask.id} style={{ opacity: subTask.done && 0.5 }}>
                    <button onClick={() => doneSubTask(subTask.id, task.id)}>
                      {subTask.done ? "✅" : "⏹️"}
                    </button>
                    <button onClick={() => deleteSubTask(subTask.id, task.id)}>
                      🗑️
                    </button>
                    <input
                      type="text"
                      onKeyDown={(e) => renameSubTask(e, subTask.id, task.id)}
                      placeholder={"Rename..."}
                    />
                    {subTask.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Tasks of category:</h2>
        {categories.map((category) => (
          <div key={category}>
            <h3>
              # {categories.indexOf(category) + 1} | {category} | (
              {returnTaskOfCaterory(category).length} Tasks.)
            </h3>
            {category !== categories.slice(0, 1)[0] && (
              <div>
                <button onClick={() => deleteCategory(category)}>🗑️</button>
                <input
                  type="text"
                  placeholder={"Add task in category..."}
                  onKeyDown={(e) => addTaskOfCategory(e, category)}
                />
              </div>
            )}
            <p>
              {returnTaskOfCaterory(category).length === 0 &&
                "You don't have any tasks in this category yet!"}
            </p>
            <ul type="disc">
              {returnTaskOfCaterory(category).map((task) => (
                <li key={task.id} style={{ opacity: task.done && 0.5 }}>
                  <button onClick={() => doneTask(task.id)}>
                    {task.done ? "✅" : "⏹️"}
                  </button>
                  <button onClick={() => deleteTask(task.id)}>🗑️</button>
                  <input
                    type="text"
                    onKeyDown={(e) => renameTask(e, task.id)}
                    placeholder={"Rename..."}
                  />
                  <select
                    onChange={(e) => moveTask(task.id, e.target.value)}
                    value={task.category}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {task.name}
                  <br />
                  <input
                    type="text"
                    onKeyDown={(e) => addSubTask(e, task.id)}
                    placeholder={"Add sub task..."}
                  />
                  <ul type="circle">
                    {task.subTasks.map((subTask) => (
                      <li
                        key={subTask.id}
                        style={{ opacity: subTask.done && 0.5 }}
                      >
                        <button
                          onClick={() => doneSubTask(subTask.id, task.id)}
                        >
                          {subTask.done ? "✅" : "⏹️"}
                        </button>
                        <button
                          onClick={() => deleteSubTask(subTask.id, task.id)}
                        >
                          🗑️
                        </button>
                        <input
                          type="text"
                          onKeyDown={(e) =>
                            renameSubTask(e, subTask.id, task.id)
                          }
                          placeholder={"Rename..."}
                        />
                        {subTask.name}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <h3>
        Add more categories:
        <br />
        <input
          type="text"
          placeholder={"Type category name here..."}
          onKeyDown={addCategory}
        />
      </h3>
    </div>
  );
}
