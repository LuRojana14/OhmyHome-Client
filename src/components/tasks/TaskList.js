import React, { Component } from "react";
import axios from "axios";

import AddTask from "./AddTask";

class TaskList extends Component {
  constructor() {
    super();
    this.state = { listOfTasks: [] };
  }

  getAllTasks = () => {
    axios.get(`http://localhost:4000/api/tasks`).then((responseFromApi) => {
      this.setState({
        listOfTasks: responseFromApi.data,
      });
    });
  };

  componentDidMount() {
    this.getAllTasks();
  }

  // DELETE TASKS:
  deleteTask = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:4000/api/tasks/${params.id}`)
      .then(() => {
        this.props.history.push("/tasks");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.listOfTasks.map((task) => {
            return (
              <div key={task._id}>
                <h3>{task.title}</h3>
                <button onClick={() => this.deleteTask()}>Delete task</button>
              </div>
            );
          })}
        </div>
        <div>
          <AddTask getData={() => this.getAllTasks()} />
        </div>
      </div>
    );
  }
}

export default TaskList;
