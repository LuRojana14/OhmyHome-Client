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
    axios.get("http://localhost:4000/message/all").then((responseFromApi) => {
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
  // acceptChange = () => {
  //   console.log("Entra");
  //   axios.post("http://localhost:4000/message/all").then((responseFromApi) => {
  //     // console.log("respuesta api:",responseFromApi);
  //     const filterMessage = responseFromApi.data.filter((data) => {
  //       // console.log('Esta es la data:', data);
  //       return data.messageReceiver === this.props.user._id;
  //     });
  //     // console.log("AQUI RESPUESTA",filterMessage);
  //     //    this.setState({
  //     //                 messageSender: filterMessage.messageSender,
  //     //                 myTask: filterMessage.myTask,
  //     //                 messageText: filterMessage.messageText,
  //     //                 taskToChange: filterMessage.taskToChange,
  //     //                 listOfMessages: filterMessage
  //     //             })
  //     // this.setState({
  //     //     listOfTasks: filterTasks,
  //     //     selectedTask:filterTasks[0].title
  //     // })
  //   });
  // };
  // updatedListMessage = () => {
  //     axios
  //       .get(`http://localhost:4000/message/all`)
  //       .then(({ data }) => {
  //         this.setState({ listOfMessages: data });
  //       });
  //   };
  deleteMessage = (messageId) => {
    axios
      .delete(`http://localhost:4000/message/deletemessage/${messageId}`)
      .then(() => {
        this.getAllMessages();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.deleteMessage();
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
            <h5 style={{ textAlign: "center", color: "#8A6FDF" }}>Messages</h5>
          </div>
          <div>
            {this.state.listOfMessages.map((messageFilter) => (
              <div key={messageFilter._id}>
                {console.log("ver filtro", messageFilter)}
                <div className="container-message-task">
                  <p style={{ fontWeight: "bold" }}>
                    From: {messageFilter.messageSender.username}
                  </p>
                  <p>Want to change: {messageFilter.myTask.title}</p>
                  <p>By: {messageFilter.taskToChange.title}</p>
                  <div className="containerreject-button">
                    <button
                      className="reject-button"
                      onClick={() => this.deleteMessage(messageFilter._id)}
                    >
                      Reject
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
