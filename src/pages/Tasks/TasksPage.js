import React from "react";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";
import Header from "../../components/Header";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import "./Task.css";
import HeaderTask from "../../components/HeaderTask";

class TasksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: null,
      tasks: [],
      users: [],
      groupName: "",
    };
  }

  componentDidMount() {
    if (!this.props.isLoggedin) {
      this.props.history.push("/login");
    }

    if (this.props.isLoggedin) {
      this.setState({ groupName: this.props.user.namegroup });
      this.refetchGroup();
      this.fetchTasks();
    }
  }

  fetchTasks = () => {
    const { namegroup } = this.props.user;
    axios
      // .get(`http://localhost:4000/api/tasks/${namegroup}`)
      .get(`${process.env.REACT_APP_API_URL}/api/tasks/${namegroup}`)
      .then(({ data }) => {
        this.setState({ tasks: data });
      });
  };

  refetchGroup = () => {
    const { namegroup } = this.props.user;
    // axios.get(`http://localhost:4000/group/${namegroup}`).then(({ data }) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/group/${namegroup}`)
      .then(({ data }) => {
        this.setState({ group: data });
      });
  };

  deleteTask = (taskId) => {
    axios
      // .delete(`http://localhost:4000/api/tasks/${taskId}`)
      .delete(`${process.env.REACT_APP_API_URL}/api/tasks/${taskId}`)
      .then(() => {
        this.refetchGroup();
        this.fetchTasks();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addTask = (title) => {
    const groupName = this.props.user.namegroup;
    axios
      // .post("http://localhost:4000/api/tasks", {
      .post(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        title,
        namegroup: groupName,
      })
      .then(() => {
        this.refetchGroup();
        this.fetchTasks();
      })
      .catch((error) => console.log(error));
  };

  assignTask = (taskId) => {
    const randomUserIndex = Math.floor(
      Math.random() * this.state.group.users.length
    );

    const randomUser = this.state.group.users[randomUserIndex];

    axios
      // .post(`http://localhost:4000/api/tasks/assign`, {
      .post(`${process.env.REACT_APP_API_URL}/api/tasks/assign`, {
        taskId,
        userId: randomUser._id,
      })
      .then(() => {
        this.refetchGroup();
        this.fetchTasks();
      });
  };

  fileOnchange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("photo", file);
    axios
      .post(
        // `http://localhost:4000/photo/upload/${this.state.groupName}`,
        `${process.env.REACT_APP_API_URL}/photo/upload/${this.state.groupName}`,
        uploadData,
        { withCredentials: true }
      )
      .then((response) => {
        const group = response.data;
        console.log("aqui esta el grupo:", group);
        this.setState({ group });
      })
      .catch((error) => console.log(error));
  };

  render() {
    if (!this.state.group) return "Loading";
    const { group, tasks } = this.state;

    return (
      <div>
        <HeaderTask />
        <div className="container-tasks">
          <div className="group-name">
            <span style={{ fontWeight: "bold" }}>Name Group: </span>
            <span>{this.state.groupName}</span>
            <div>
              {/* <span style={{ fontWeight: "bold" }}>Members:</span> */}
              <span>{this.state.users}</span>
            </div>
          </div>
          {/* <div style={{ marginTop: "50px" }}></div> */}
          <div className="group-photo">
            <img className="photo" src={this.state.group.imageUrl} alt="" />
            <input
              className="select-photo"
              type="file"
              onChange={this.fileOnchange}
            ></input>
          </div>
          <div>
            <AddTask
              groupName={group.groupName}
              addTask={this.addTask}
              getData={() => {
                this.refetchGroup();
                this.fetchTasks();
              }}
            />
            {/* <div style={{ marginTop: "50px" }}></div> */}
            <TaskList
              deleteTask={this.deleteTask}
              listOfTasks={tasks}
              assignTask={this.assignTask}
            ></TaskList>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(TasksPage);
