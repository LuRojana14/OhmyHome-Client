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
        <div className="container-createTask">
          <Form onSubmit={this.handleFormSubmit}>
            <p style={{ fontWeight: "bold" }}>Add a task</p>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="title"
                required
                value={this.state.title}
                style={{
                  boxShadow:
                    "rgba(84, 70, 35, 0.15) 0px 2px 8px, rgba(84, 70, 35, 0.15) 0px 1px 3px, rgba(255, 255, 255, 0.5) 0px 0px 0px 1px",
                }}
                onChange={(e) => this.handleChange(e)}
              />
            </Form.Group>
            <div className="container-create">
              <button className="button-create" type="submit" value="submit">
                Create
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

export default AddTask;
