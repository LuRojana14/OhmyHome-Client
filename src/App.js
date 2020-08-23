import React, { Component } from "react";
import { Switch } from "react-router-dom";
// import { BrowserRouter as Router } from "react-router-dom"; // <== !!!
import AuthProvider from "./lib/AuthProvider";
import { Router } from "./router";

// import Botones from "./components/Botones";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Private from "./pages/Private";
// import AnonRoute from "./components/AnonRoute";
// import PrivateRoute from "./components/PrivateRoute";
// import TaskPage from "./components/tasks/TaskPage";
// import Profile from "./components/profile/Profile";
// import Home from "./pages/Home";
// import { Helmet } from "react-helmet";
// import { BrowserRouter as Router } from "react-router-dom"; // <== !!!
import "bootstrap/dist/css/bootstrap.min.css";
// import Group from "./components/group/Group";

// Router() === <Router/>

class App extends Component {
  render() {
    return (
      <div className="container">
        <AuthProvider>
          <Router />
        </AuthProvider>
      </div>
    );
  }
}

export default App;
