import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";
import AuthProvider from "./lib/AuthProvider";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import TaskList from "./components/tasks/TaskList";
import NavbarII from "./components/navbar/NavBarII";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />

          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />{" "}
            <PrivateRoute path="/private" component={Private} />
            <Route exact path="/navbarII" component={NavbarII} />
            <Route exact path="/tasks" component={TaskList} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
