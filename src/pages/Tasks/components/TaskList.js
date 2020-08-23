import React, { Component } from "react";
import RandomButton from "./../random/RandomButton";
import Button from "react-bootstrap/Button";

class TaskList extends Component {
  render() {
    return (
      <div>
        <div className="container-allTasks">
          <h5>Group Tasks:</h5>
          {this.props.listOfTasks.map((task) => {
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
                      onClick={() => this.props.deleteTask(task._id)}
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

export default TaskList;
