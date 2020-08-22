import React, { Component } from "react";
import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Form1 from "./../form/Form1";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { groupName: this.props.namegroup, isClicked: false };
  }

  showForm = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const groupName = this.props.namegroup;
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
          {this.state.isClicked ? (
            <Form1 groupName={this.state.groupName} />
          ) : null}
          <input onClick={this.showForm} value="Next" />
        </form>
      </div>
    );
  }
}

export default Group;
