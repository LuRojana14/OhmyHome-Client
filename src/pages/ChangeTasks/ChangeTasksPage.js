import React, { Component } from "react";
import axios from "axios";
// import { Switch, Route } from "react-router-dom";
import { withAuth } from "../../utils/AuthProvider";
import { Link } from "react-router-dom";
import "./changeTask.css";
import { Helmet } from "react-helmet";

class ChangeTasksPage extends Component {
  constructor(props) {
    super(props);
    //DUDA
    this.state = {
      listOfTasks: [],
      groupName: this.props.user.namegroup,
      allUsers: "",
      mensaje: "",
      selectedTask: "",
    };
    console.log("a ver", this.props.user.namegroup);
  }
  getAllTasks = () => {
    console.log(this.props);
    axios
      .get(`http://localhost:4000/api/tasks/${this.state.groupName}`)
      .then((responseFromApi) => {
        const filterTasks = responseFromApi.data.filter((data) => {
          console.log("AQUI RESPUESTA", responseFromApi.data);
          return data.user._id != this.props.user._id;
          // console.log(this.props);
        });
        // console.log("resuesta de api:",responseFromApi)
        this.setState({
          listOfTasks: filterTasks,
          selectedTask: filterTasks[0].title,
        });
        // console.log(this.state.listOfTasks);
      });
  };
  componentDidMount() {
    this.getAllTasks();
    this.getThegroup();
  }
  getThegroup = () => {
    console.log(this.props);
    axios.get(`http://localhost:4000/group/${this.state.groupName}`).then(
      (groupFromApi) => {
        const allUsers = groupFromApi.data.users.map((users) => users.username);
        this.setState({
          allUsers: allUsers,
        });
      }
      // console.log("DATOS DEL GRUPO:",groupFromApi.data.users.map(users=>users.username))
    );
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSelect = (event) => {
    const { value } = event.target;
    this.setState({ selectedTask: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const selectedTaskObj = this.state.listOfTasks.find(
      (task) => task.title === this.state.selectedTask
    );
    const message = {
      messageSender: this.props.user._id,
      messageReceiver: selectedTaskObj.user._id,
      myTask: this.props.match.params.taskId,
      messageText: this.state.mensaje,
      taskToChange: selectedTaskObj._id,
    };
    //todo vendra por id, en el back tengo que validar que el modelo
    axios
      .post("http://localhost:4000/message/createmessage", message, {
        withCredentials: true,
      })
      .then((userUpdated) => {
        this.props.history.push("/profile");
      });
  };
  render() {
    return (
      <div>
        <Helmet>
          <body className="body-change"></body>
        </Helmet>
        <div className="container-change">
          <div className="container-titlechange">
            <p
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              What task would you like to do?
            </p>
          </div>
          <div className="general-container">
            {this.getThegroup}
            {this.getAllTasks}
            <div className="select-task">
              <select
                value={this.state.selectedTask}
                onChange={this.handleSelect}
              >
                {this.state.listOfTasks.map((task) => {
                  return (
                    <option key={task._id}>
                      {task.title} - {task.user.username}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="contenedor-change">
              {/* <div className="select">
            <p>{this.state.allUsers}</p>
          </div> */}
              <div className="formulario">
                <form onSubmit={this.handleSubmit}>
                  <div className="container-willingtodo">
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "16px",
                      }}
                    >
                      What are you willing to do?
                    </p>
                  </div>
                  <div className="textArea">
                    <textarea
                      name="mensaje"
                      value={this.state.mensaje}
                      onChange={(e) => this.handleChange(e)}
                    />
                    <div>
                      <Link to="/profile">
                        <button className="button-back">Back</button>
                      </Link>
                    </div>
                    <div className="container-button-change">
                      <button className="button-back">
                        <input
                          className="button-back"
                          type="submit"
                          value="Submit"
                        />
                      </button>
                    </div>
                  </div>
                </form>
                {/* <input type="submit" value="send" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// class ChangeTasksPage extends Component {
//     constructor(props) {
//         super(props);
//         this.state = "" ;
//       }
// ir probando
//     //   getAllTasks = () => {
//     //     axios.get(`http://localhost:4000/api/tasks`).then((responseFromApi) => {
//     //       console.log(responseFromApi.data);
//     //       this.setState({
//     //         listOfTasks: responseFromApi.data,
//     //         users: responseFromApi.data,
//     //       });
//     //     });
//     //   };
//     render() {
//       return (
//         <div>
//         <h1>What would you really like to do?</h1>
//              {/* aqui deberia estar mi ruta */}
//          {/* <div component={TaskList}> PRUEBA </div>
//          {this.state.task.map((e,index)=>
//                         <div key={index}>
//                             <option>{e.task}</option>
//                             </div>
//                          )} */}
//           {/* <TaskList/>                */}
//          <div className="select">
//          <select>
//           <option>Task1</option>
//           <option>Task2</option>
//           <option>Task3</option>
//           <option>Task4</option>
//           <option>Task5</option>
//         </select>
//         </div>
//       </div>
//       );
//     }
//   }
export default withAuth(ChangeTasksPage);
//   export default withAuth(ChangeTasksPage);
//crear una ruta para solicitar todos los mensajes
//perfil deberia enviar el id de la tarea por el link (params :_id)
//empujar el id del mensaje al perfil del usuario
