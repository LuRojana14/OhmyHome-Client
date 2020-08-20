import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";

import Botones from "./components/Botones";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import TaskList from "./components/tasks/TaskList";
import Profile from "./components/profile/Profile";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Botones />
          {/* <NavbarII /> */}

          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/private" component={Private} />
            <PrivateRoute exact path="/tasks" component={TaskList} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
