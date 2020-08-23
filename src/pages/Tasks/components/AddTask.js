import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    this.props.addTask(title);
    this.setState({ title: "" });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleFormSubmit}>
          <h5>Add a task</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>

          <Button variant="outline-warning" type="submit" value="submit">
            Create
          </Button>
        </Form>

        {/* <form onSubmit={this.handleFormSubmit}>
          <h4>Add a task</h4>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form> */}
      </div>
    );
  }
}

export default AddTask;
