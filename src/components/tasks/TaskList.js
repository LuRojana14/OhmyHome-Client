import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddTask from "./AddTask";
import RandomButton from "./../random/RandomButton";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = { listOfTasks: [] };
  }

  //BUSCA TODAS LAS TASKS DE LA RUTA /tasks DEL BACK
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

  // DELETE TASK:
  deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:4000/api/tasks/${taskId}`)
      .then(() => {
        this.getAllTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <AddTask getData={() => this.getAllTasks()} />
        </div>
        <div>
          {this.state.listOfTasks.map((task) => {
            return (
              <div key={task._id}>
                <p>{task.title}</p>
                <button onClick={() => this.deleteTask(task._id)}>
                  Delete task
                </button>
                <RandomButton id={task._id} />
              </div>
            );
          })}
        </div>
        {/* <div
          <div>The task was won by:{this.props.random}</div>
        </div> */}
        <div>
          <Link to={"/profile"}>Go to profile</Link>
        </div>
      </div>
    );
  }
}

export default TaskList;
