import React, { Component } from "react";
// import RandomButton from "./../random/RandomButton";
import Button from "react-bootstrap/Button";

class TaskList extends Component {
  handleAssignRandomTask = (taskId) => {
    this.props.assignTask(taskId);
  };

  getAssignedText = (task) => {
    if (task.user && task.user.username) {
      return task.user.username;
    } else {
      return "";
    }
  };

  isAssigned = (task) => {
    return task.user ? true : false;
  };

  render() {
    return (
      <div>
        <div>
          <h5>Group Tasks:</h5>
          {this.props.listOfTasks.map((task) => {
            return (
              <div key={task._id} style={{ padding: "8px 0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    boxShadow:
                      "rgba(84, 70, 35, 0.15) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px, rgba(255, 255, 255, 0.5) 0px 0px 0px 1px",
                  }}
                >
                  <span>{task.title}</span>
                  <div style={{ marginRight: "5px" }} />
                  <span>Assigned to: {this.getAssignedText(task)}</span>
                  <div style={{ flexGrow: 1 }} />
                  <Button
                    disabled={!!this.isAssigned(task)}
                    onClick={() => this.handleAssignRandomTask(task._id)}
                    size="sm"
                    variant="link"
                  >
                    Random
                  </Button>
                  <div style={{ marginRight: "10px" }} />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => this.props.deleteTask(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TaskList;
