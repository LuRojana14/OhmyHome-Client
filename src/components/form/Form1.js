import React, { Component } from "react";
// import axios from "axios";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

class Form extends Component {
  constructor() {
    super();
    this.state = "";
  }

  render() {
    return (
      <div>
        <form>
          <label>How many cleaners?</label>
          <input type="number" name="text" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Form;
