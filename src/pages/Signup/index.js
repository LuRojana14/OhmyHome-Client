import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CreateGroup } from "./components";
import { Input, Button } from "../../components";
import axios from "axios";
import { withAuth } from "../../utils/AuthProvider";

class SignUpClass extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      namegroup: "", //que va aca
      isClicked: false,
      isLogged: false,
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { username, password, namegroup } = this.state;
    this.props.signup({ username, password, namegroup });
    axios
      .post("http://localhost:4000/auth/signup", {
        username,
        password,
        namegroup,
      })
      .then((response) => {
        console.log("respuesta:", response);
        //TODO: ver que poner aqui
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOpenGroup = (ev) => {
    ev.preventDefault();

    this.setState({ isClicked: true });
  };

  render() {
    const { username, password, namegroup } = this.state;

    return (
      <div
        style={{
          display: "flex",
          background: "yellow",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: 12,
            width: 400,
            height: 400,
            padding: 20,
            background: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {!this.state.isLogged ? (
            <>
              <Input
                type="text"
                name="username"
                value={username}
                placeholder="cleaner name"
                onChange={this.handleChange}
              />
              <Input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={this.handleChange}
              />
              <Input
                type="text"
                name="namegroup"
                value={namegroup}
                placeholder="Group-Name"
                onChange={this.handleChange}
              />
              <Button type="submit" color={"green"} onClick={this.onSubmit}>
                Submit
              </Button>
            </>
          ) : (
            <CreateGroup />
          )}

          <p>already have an account?</p>
          <Link to={"/login"}>To login</Link>
        </div>
      </div>
    );
  }
}

export const SignUp = withAuth(SignUpClass);
