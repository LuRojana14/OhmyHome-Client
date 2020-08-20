import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider"; //	<-- UPDATE HERE
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // console.log('Login -> form submit', { username, password });
    this.props.login({ username, password }); //	<-- UPDATE HERE
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

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

          <input type="submit" value="Login" />
        </form>
        <p>Have an account?</p>
        <Link to={"/signup"}> Signup</Link>
      </div>
    );
  }
}

export default withAuth(Login);
