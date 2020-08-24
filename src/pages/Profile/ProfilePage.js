import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: null };
  }

  // CREATE PROFILE:
  getProfile = () => {
    axios
      .get(`http://localhost:4000/profile`, { withCredentials: true })
      .then((responseFromApi) => {
        console.log(responseFromApi.data);
        this.setState({
          profile: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getProfile();
  }

  render() {
    const { profile } = this.state;

    if (!profile) return "Loading...";

    return (
      <div
        style={{
          width: "500px",
          paddingTop: "100px",
          padding: "50px 100px",
          borderRadius: "4px",
          maxWidth: "800px",
          margin: "auto",
          marginTop: "100px",
          backgroundColor: "#F8F5F1",
        }}
      >
        <Card>
          <Card.Body>
            <Card.Title>
              <p>Hello {profile.username}</p>
            </Card.Title>
            <Card.Text>
              <span>These are your tasks!:</span>
              <br />
              {profile.tasks.map((task) => {
                return (
                  <span
                    style={{
                      textDecoration: "underline",
                      display: "block",
                    }}
                  >
                    {task.title}
                  </span>
                );
              })}
            </Card.Text>
            <div style={{ marginBottom: "50px" }} />
            <Button variant="outline-warning">
              <Link to="/tasks" style={{ textDecoration: "none" }}>
                👈 Back
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

export default ProfilePage;
