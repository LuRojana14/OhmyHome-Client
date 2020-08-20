import React, { Component } from "react";
import axios from "axios";
// import TaskList from "./../tasks/TaskList";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>
              <p>Hello {this.state.ProfileOne.username}</p>
            </Card.Title>
            <Card.Text>
              <p>These are your tasks:</p>
            </Card.Text>
            <Button variant="outline-warning">
              <Link to="/tasks" style={{ textDecoration: "none" }}>
                Back
              </Link>
            </Button>
          </Card.Body>
        </Card>

        {/* <p>Hello {this.state.ProfileOne.username}</p>
        <p>These are your tasks:</p> */}
      </div>
    );
  }
}

export default Profile;
