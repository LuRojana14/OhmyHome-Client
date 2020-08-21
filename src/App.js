import React, { Component } from "react";
import { Switch } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom"; // <== !!!
import AuthProvider from "./lib/AuthProvider";

import Botones from "./components/Botones";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import TaskList from "./components/tasks/TaskList";
import Profile from "./components/profile/Profile";
// import Home from "./pages/Home";
// import { Helmet } from "react-helmet";
// import { BrowserRouter as Router } from "react-router-dom"; // <== !!!
import "bootstrap/dist/css/bootstrap.min.css";
import Group from "./components/group/Group";

class App extends Component {
  render() {
    return (
      <div className="container">
        <AuthProvider>
          <Botones />

          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <AnonRoute path="/group" component={Group} />
            <PrivateRoute path="/private" component={Private} />
            <PrivateRoute exact path="/tasks" component={TaskList} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
