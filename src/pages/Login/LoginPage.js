import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Form, Button } from "react-bootstrap";
import { withAuth } from "../../utils/AuthProvider";
import "./login.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    if (this.props.isLoggedin) {
      this.props.history.push("/tasks");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    axios
      // .post("http://localhost:4000/auth/login", {
      .post(`${process.env.REACT_APP_API_URI}/auth/login`, {
        username,
        password,
      })
      .then(
        () => {
          window.location.reload();
          console.log("login successful");
        },
        () => {
          console.log("problem login in");
        }
      );
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <Helmet>
          <body className="body-signup"></body>
        </Helmet>
        <div className="container-login">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Username</label>
              <input
                required
                name="username"
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

            <div className="container-login-button">
              <button className="button-log" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>

        <div className="container-sign">
          <div className="text-sign">
            <p>Don't have an account? Create one!</p>
          </div>
          <div>
            <button
              className="button-sign"
              onClick={() => this.props.history.push("/signup")}
              size="sm"
              variant="outline-primary"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(LoginPage);
