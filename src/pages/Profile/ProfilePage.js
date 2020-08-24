import React, { Component } from "react";
import axios from "axios";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./profile.css";

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
      <div>
        <Header />
        <div className="container-profile">
          <div className="hello-container">
            <p>Hello {profile.username}</p>
          </div>

          <div className="your-tasks">
            <p style={{ fontWeight: "bold" }}>Your tasks:</p>

            {profile.tasks.map((task) => {
              return (
                <span
                  style={{
                    textDecoration: "underline",
                    display: "block",
                  }}
                >
                  {task.title}
                  <button>+</button>
                </span>
              );
            })}
          </div>

          <div className="back-container">
            <button className="back-button">
              <Link to="/tasks">Back</Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
