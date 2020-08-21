import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
// import Button from "react-bootstrap/Button";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      namegroup: this.props.groupName,
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, namegroup } = this.state;
    // console.log("Signup -> form submit", { username, password });
    this.props.signup({ username, password, namegroup }); //	<-- UPDATE HERE
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h2>Signup</h2>

        <form onSubmit={this.handleFormSubmit}>
          {/* <label>Username:</label> */}
          <input
            type="text"
            name="username"
            value={username}
            placeholder="username"
            onChange={this.handleChange}
          />

          {/* <label>Password:</label> */}
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Set password"
            onChange={this.handleChange}
          />

          <input type="submit" value="Next" />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default withAuth(Signup);
