import React, { Component } from "react";
import axios from "axios";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.theProject.title,
    };
  }

  handleFormSubmit = (event) => {
    const title = this.state.title;

    event.preventDefault();

    axios
      .put(`http://localhost:4000/api/tasks/${this.props.theTask._id}`, {
        title,
      })
      .then(() => {
        this.props.getTheTask();
        // after submitting the form, redirect to '/projects'
        this.props.history.push("/tasks");
      })
      .catch((error) => console.log(error));
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit task</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChangeTitle(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditTask;
