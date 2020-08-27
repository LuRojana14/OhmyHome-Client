import React, { Component } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import { withAuth } from "../../utils/AuthProvider";
import { Link } from "react-router-dom";
import "./changeTask.css";
class AllUsersGroup extends Component {
  constructor(props) {
    super(props);
    //DUDA
    this.state = { listOfTasks: [], groupName: this.props.user.namegroup };
    console.log("a ver", this.props.user.namegroup);
  }
  getThegroup = () => {
    console.log(this.props);
    axios
      // .get(`http://localhost:4000/group/${this.state.groupName}`)
      .get(`${process.env.REACT_APP_API_URL}/group/${this.state.groupName}`)
      .then((groupFromApi) => console.log("resuesta de api2:", groupFromApi));
  };
  componentDidMount() {
    this.getTheGroup();
  }
  render() {
    return (
      <div className="contenedor-change">
        <div className="select">
          <select>
            <option>Cleaner</option>
            <option>User1</option>
            <option>Task3</option>
            <option>Task4</option>
            <option>Task5</option>
          </select>
        </div>
        <div className="formulario">
          <form onSubmit="">
            <p>What are you willing to do?</p>
            <div className="textArea">
              <textarea name="description" value="" onChange="" />
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withAuth(AllUsersGroup);
