
import React, { Component } from "react";
import axios from "axios";



export class CreateGroup extends Component {
  constructor() {
    super();
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

  render () {
    return (
      <div>
        <form>
          {/* PREGUNTAR LOS VALUES */}
          <input type="text" name="group" value="" placeholder="Group-Name"></input>
          <input type="submit" name="" value="next"></input>
        </form>
      </div>
    );
  }
}








