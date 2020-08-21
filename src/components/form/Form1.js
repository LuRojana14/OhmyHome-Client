import React, { Component } from "react";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Signup from "./../../pages/Signup";

class Form extends Component {
  constructor() {
    super();
    this.state = { cleaners: {}, isClicked: false };
  }

  showForm = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    return (
      <div>
        <form>
          <label>How many cleaners?</label>
          <input type="number" name="text" />
          {this.state.isClicked ? <Signup /> : null}
          <input onClick={this.showForm} type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Form;
