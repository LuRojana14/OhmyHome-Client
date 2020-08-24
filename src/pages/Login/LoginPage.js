import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Form, Button } from "react-bootstrap";
import { withAuth } from "../../utils/AuthProvider";

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
      .post("http://localhost:4000/auth/login", {
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
      <div
        style={{
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          width: "400px",
          margin: "auto",
          marginTop: "100px",
        }}
      >
        <Helmet>
          <body className="signUpPage" />
        </Helmet>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              name="username"
              onChange={this.handleChange}
              type="text"
              value={username}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              required
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
              value={password}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form.Group>
          <div style={{ marginTop: "50px" }} />
          <Form.Group>
            <p>You don't have an account? want to create one instead?</p>
            <Button
              onClick={() => this.props.history.push("/signup")}
              size="sm"
              variant="outline-primary"
              type="submit"
            >
              Sign up 🙌
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withAuth(LoginPage);
