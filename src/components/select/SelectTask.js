import Dropdown from "react-bootstrap/Dropdown";

import React, { Component } from "react";
import axios from "axios";
import AddTask from "./AddTask";
import RandomButton from "./../random/RandomButton";
import Button from "react-bootstrap/Button";

class SelectTask extends Component {
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

  render() {
    return (
      <div>
        <div>
          <AddTask getData={() => this.getAllTasks()} />
        </div>
        <div className="container-allTasks">
          <h5>Group Tasks:</h5>
          {this.state.listOfTasks.map((task) => {
            return (
              <div key={task._id}>
                <div className="container-delete">
                  <div className="task-list">
                    <p>{task.title}</p>
                  </div>
                  <div className="random-button">
                    <Button variant="outline-secondary">
                      <RandomButton id={task._id} />
                      Random
                    </Button>
                  </div>
                  <div className="deleteTask-button">
                    <Button
                      variant="outline-secondary"
                      onClick={() => this.deleteTask(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div
          <div>The task was won by:{this.props.random}</div>
        </div> */}
      </div>
    );
  }
}

export default SelectTask;
