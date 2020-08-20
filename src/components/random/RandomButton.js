import React, { Component } from "react";
import axios from "axios";

class RandomButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [],
    };
  }

  handleClick() {
    const username = this.state.username;

    //con put traigo todas las TASKS
    axios
      .put(
        `http://localhost:4000/profile/addTask/${this.props.id}`,
        {
          username,
        },
        { withCredentials: true }
      )
      .then((responseFromApi) => {
        this.setState({
          username: responseFromApi.data,
        });
      });
  }

  RandomUser() {
    //aca hago la llamada de axios con un get desde groupRoute para tener todos los perfiles
    // y luego hacer un random de todos los perfiles para que se asigne la task y mandarle esta info al back
    axios
      .get(`http://localhost:4000/group/allusers`, { withCredentials: true })

      .then((responseFromApi) => {
        this.setState({
          username: responseFromApi.data(
            Math.floor().Math.random() * responseFromApi.data.length
          ),
          //en la respuesta, hacer el random sobre todos los perfiles
          // agarrar el nombre del usuario x id
        }).catch((error) => console.log(error));
      });
  }

  render() {
    return <div></div>;
  }
}

export default RandomButton;
