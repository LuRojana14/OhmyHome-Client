import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
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
        <h1>Messages</h1>
        <div>
          {this.state.listOfMessages.map((messageFilter) => (
            <div key={messageFilter._id}>
              {console.log("ver filtro", messageFilter)}
              <p>Message from: {messageFilter.messageSender.username}</p>
              <p>{}</p>
              <p>Want to change this task:</p>
              <p>{messageFilter.myTask.title}</p>
              <p>for</p>
              <p>{messageFilter.taskToChange.title}</p>
              {/* <Button onClick={}>Accept Change</Button> */}
              <Button onClick={() => this.deleteMessage(messageFilter._id)}>
                Reject Change
              </Button>
            </div>
          ))}
        </div>
        <Link to="/profile">
          <Button>Back to profile</Button>
        </Link>
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
