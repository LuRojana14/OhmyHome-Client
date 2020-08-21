import React, { Component } from "react";
import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Form1 from "./../form/Form1";

class Group extends Component {
  constructor() {
    super();
    this.state = { groupName: "", isClicked: false };
  }

  showForm = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const groupName = this.state.groupName;
    axios
      .post("http://localhost:4000/group/creategroup", { groupName })
      .then(() => {
        this.setState({ groupName: "" });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <h5>Create group</h5>
          <label>Group Name:</label>
          <input
            type="text"
            name="groupName"
            value={this.state.groupName}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />
          {this.state.isClicked ? <Form1 /> : null}
          {/* <Button variant="outline-warning"> */}
          {/* <button onClick={this.showForm}>Submit</button> */}

          <input onClick={this.showForm} type="submit" value="Submit" />
          {/* </Button> */}
        </form>
      </div>
    );
  }
}

export default Group;
