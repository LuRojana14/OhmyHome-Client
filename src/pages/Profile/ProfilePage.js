import React, { Component } from "react";
import axios from "axios";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./profile.css";
import { Bell } from "../../components/Bell";
import { withAuth } from "../../utils/AuthProvider";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { profile: null };
  }

  // CREATE PROFILE:
  getProfile = () => {
    axios
      // .get(`http://localhost:4000/profile`, { withCredentials: true })
      .get(`${process.env.REACT_APP_API_URL}/profile`, {
        withCredentials: true,
      })
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
    let bell = "";
    let messages = 0;
    const { profile } = this.state;
    if (this.props.user !== null) {
      messages = this.props.user.penddingMess.length;
    }
    console.log("CANTIDAD", messages);
    if (!profile) return "Loading...";
    if (messages > 0) {
      bell = (
        <Link to="/message/all">
          <div>
            <Bell />
          </div>
        </Link>
      );
    }
    return (
      <div>
        <Header />
        <div className="container-profile">
          <div className="name-notifications">
            <div className="hello-container">
              <p style={{ fontWeight: "bold" }}>{profile.username}</p>
            </div>
            <div className="pru">
              <div className="bell">{bell}</div>
            </div>
          </div>

          <div className="profile-tasks">
            <div className="your-tasks">
              <p style={{ fontWeight: "bold" }}>Your tasks:</p>

              {profile.tasks.map((task) => {
                return (
                  <div className="list-profiletasks">
                    <div className="tasks-list">{task.title}</div>
                    <div>
                      <Link
                        to={`/change/${task._id}`}
                        style={{
                          color: "#FF5765",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        <i class="fas fa-undo-alt"></i>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="back-container">
          <button className="back-button">
            <Link style={{ color: "#FFDB15" }} to="/tasks">
              Back
            </Link>
          </button>
        </div> */}
      </div>
    );
  }
}

export default withAuth(ProfilePage);
