import React, { Component } from "react";
import axios from "axios";
// import TaskList from "./../tasks/TaskList";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { ProfileOne: {} };
  }

  // CREATE PROFILE:
  getProfile = () => {
    axios
      .get(`http://localhost:4000/profile`, { withCredentials: true })
      .then((responseFromApi) => {
        console.log(responseFromApi.data);
        this.setState({
          ProfileOne: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <div>
        <p>Hello {this.state.ProfileOne.username}</p>
      </div>
    );
  }
}

export default Profile;
