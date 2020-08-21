import React, { Component } from "react";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import Signup from "./../../pages/Signup";

class Form extends Component {
  constructor(props) {
    super(props);

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
          {this.state.isClicked ? (
            <Signup groupName={this.props.groupName} />
          ) : null}
          <input onClick={this.showForm} value="Next" />
        </form>
      </div>
    );
  }
}

export default Form;
