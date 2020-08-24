import React from "react";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";
import Header from "../../components/Header";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

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
      .get(`http://localhost:4000/api/tasks/${namegroup}`)
      .then(({ data }) => {
        this.setState({ tasks: data });
      });
  };

  refetchGroup = () => {
    const { namegroup } = this.props.user;
    axios.get(`http://localhost:4000/group/${namegroup}`).then(({ data }) => {
      this.setState({ group: data });
    });
  };

  deleteTask = (taskId) => {
    axios
      .delete(`http://localhost:4000/api/tasks/${taskId}`)
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
      .post("http://localhost:4000/api/tasks", {
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
      .post(`http://localhost:4000/api/tasks/assign`, {
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
    const uploadData = new FormData()
    uploadData.append('photo', file)

   axios.post(`http://localhost:4000/photo/upload/${this.state.groupName}`,uploadData, {withCredentials:true})
    .then((response) => {
      const group = response.data
      console.log("aqui esta el grupo:" ,group)
      this.setState({group})
    })
    .catch((error) => console.log(error))
  }

  render() {
    if (!this.state.group) return "Loading";
    const { group, tasks } = this.state;

    return (
      <div>
        <Header />
        <div
          style={{
            marginBottom: "50px",
          }}
        />
        <div
          style={{
            padding: "50px 100px",
            borderRadius: "4px",
            maxWidth: "800px",
            margin: "auto",
            backgroundColor: "#F8F5F1",
          }}
        >
          You are in the group:{" "}
          <span style={{ fontWeight: "bold" }}>{this.state.groupName}</span>
          <div style={{ marginTop: "50px" }}></div>
          <img src={this.state.group.imageUrl}/>
          <input type="file" onChange={this.fileOnchange}></input> 
          <div>
            <AddTask
              groupName={group.groupName}
              addTask={this.addTask}
              getData={() => {
                this.refetchGroup();
                this.fetchTasks();
              }}
            />
            <div style={{ marginTop: "50px" }}></div>
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
