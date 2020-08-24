import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";
import { Form, Button } from "react-bootstrap";
import { Helmet } from "react-helmet";

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
        <h3>Lets get your account setup!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              required
              onChange={this.handleChange}
              type="text"
              value={username}
              placeholder="Enter username"
            />
            <Form.Text className="text-muted">
              Enter your username (could be an email as well)
            </Form.Text>
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
          <Button variant="primary" type="submit">
            Create account
          </Button>
          <div style={{ marginTop: "50px" }} />
          <Form.Group>
            <p>You already have an account, login instead!</p>
            <Button
              onClick={() => this.props.history.push("/login")}
              size="sm"
              variant="outline-primary"
              type="submit"
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withAuth(SignUpPage);
