import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";
import { Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "./signup.css";

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      groupName: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password, groupName } = this.state;
    axios
      .post("http://localhost:4000/auth/signup", {
        username,
        password,
        namegroup: groupName,
      })
      .then((response) => {
        console.log("Signup successful: ", response);
        this.props.refetchSession().then(() => {
          this.props.history.push("/group-setup");
        });
      })
      .catch((error) => {
        console.log("Error during sign up: ");
        console.log(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <Helmet>
          <body className="body-signup"></body>
        </Helmet>

        {/* <h5>Lets get your account setup!</h5> */}
        <div className="container-signup">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="container-form">
              <div>
                <label>Username</label>
                <input
                  name="username"
                  required
                  onChange={this.handleChange}
                  type="text"
                  value={username}
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label>Password</label>
                <input
                  name="password"
                  required
                  onChange={this.handleChange}
                  type="password"
                  placeholder="Password"
                  value={password}
                />
              </div>
              <div className="container-signup-button">
                <button className="button-signup" type="submit">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container-log">
          <div className="text-log">
            <p>Already have an account?, login instead!</p>
          </div>
          <div>
            <button
              className="button-login"
              onClick={() => this.props.history.push("/login")}
              size="sm"
              variant="outline-primary"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(SignUpPage);
