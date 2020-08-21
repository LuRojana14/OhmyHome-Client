import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = { groupName: "" };
  }

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
        <Form onSubmit={this.handleFormSubmit}>
          <h5>Create your group</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.groupName}
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Password Group</Form.Label>
            <Form.Control
              type="password"
              name="title"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>

          <Button variant="outline-warning" type="submit" value="submit">
            Create
          </Button>
        </Form>
      </div>
    );
  }
}

export default Group;
