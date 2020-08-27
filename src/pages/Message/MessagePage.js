import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Header from "../../components/Header";
import { Helmet } from "react-helmet";

import "./message.css";

class MessagePage extends Component {
  constructor(props) {
    super(props);
    //DUDA
    this.state = {
      listOfMessages: [],
      messageSender: "",
      myTask: "",
      messageText: "",
      taskToChange: "",
    };
    console.log("a ver QUE PIJA HAY ACA", this.state);
  }
  getAllMessages = () => {
    console.log("Entra");
    // axios.get("http://localhost:4000/message/all").then((responseFromApi) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/message/all`)
      .then((responseFromApi) => {
        // console.log("ESTE VIEJA:",responseFromApi);
        const filterMessage = responseFromApi.data.filter((data) => {
          console.log("Esta es la data:", data);
          return data.messageReceiver._id === this.props.user._id;
        });
        console.log("AQUI RESPUESTA", filterMessage);
        console.log("MENSAJE FILTRADO", filterMessage.messageSender);
        this.setState({
          // messageSender: filterMessage.messageSender,
          // myTask: filterMessage.myTask,
          // messageText: filterMessage.messageText,
          // taskToChange: filterMessage.taskToChange,
          listOfMessages: filterMessage,
        });
        // this.setState({
        //     listOfTasks: filterTasks,
        //     selectedTask:filterTasks[0].title
        // })
      });
  };

  acceptChange = (myTaskId, yourTaskId, userFromId, userToId, messageId) => {
    console.log("Entra");
    //DEBERIA ACTUALIZAR LAS TAREAS
    axios
      .post(
        // `http://localhost:4000/api/tasks/reassign`,
        `${process.env.REACT_APP_API_URL}/api/tasks/reassign`,
        { myTaskId, yourTaskId, userFromId, userToId },
        { withCredentials: true }
      )
      //BORRAR EL MENSAJE
      .then(() => {
        this.deleteMessage(messageId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  deleteMessage = (messageId) => {
    axios
      // .delete(`http://localhost:4000/message/deletemessage/${messageId}`)
      .delete(
        `${process.env.REACT_APP_API_URL}/message/deletemessage/${messageId}`
      )

      .then(() => {
        this.getAllMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    // this.deleteMessage();
    this.getAllMessages();
  }

  render() {
    console.log("esto", this.state.listOfMessages);
    return (
      <div>
        <Header />
        <Helmet>
          <body className="body-message"></body>
        </Helmet>
        <div className="general-container-messages">
          <div className="message-title">
            {/* <h5 style={{ textAlign: "center", color: "#8A6FDF" }}>Messages</h5> */}
          </div>
          <div>
            {this.state.listOfMessages.map((messageFilter) => (
              <div key={messageFilter._id}>
                <div className="container-message-task">
                  <p style={{ fontWeight: "bold" }}>
                    From: {messageFilter.messageSender.username}
                  </p>
                  <p>Want to change: {messageFilter.myTask.title}</p>
                  <p>For: {messageFilter.taskToChange.title}</p>
                  <p>Offert: {messageFilter.messageText}</p>
                  <div className="containerreject-button">
                    <button
                      className="reject-button"
                      onClick={() =>
                        this.acceptChange(
                          messageFilter.myTask._id,
                          messageFilter.taskToChange._id,
                          messageFilter.messageSender._id,
                          messageFilter.messageReceiver._id,
                          messageFilter._id
                        )
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="accept-button"
                      onClick={() => this.deleteMessage(messageFilter._id)}
                    >
                      Are you kidding me?
                    </button>
                  </div>
                  {/* <Button onClick={}>Accept Change</Button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
//
export default withAuth(MessagePage);
//   export default withAuth(ChangeTasksPage);
//crear una ruta para solicitar todos los mensajes
//perfil deberia enviar el id de la tarea por el link (params :_id)
//empujar el id del mensaje al perfil del usuario
