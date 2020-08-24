import React from "react";
import AuthProvider from "./utils/AuthProvider";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Route, Switch, BrowserRouter as ReactRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import SignUpPage from "./pages/Signup/SignupPage";
import LoginPage from "./pages/Login/LoginPage";
import GroupSetupPage from "./pages/Signup/GroupSetupPage";
import TasksPage from "./pages/Tasks/TasksPage";
import Header from "./components/Header";
import "./App.css";
import ProfilePage from "./pages/Profile/ProfilePage";

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossorigin="anonymous"
        />
      </Helmet>
      <ReactRouter>
        <Switch>
          <Route path={"/signup"} component={SignUpPage} />
          <Route path={"/login"} component={LoginPage} />
          <Route path={"/group-setup"} component={GroupSetupPage} />
          <Route path={"/tasks"} component={TasksPage} />
          <Route path={"/profile"} component={ProfilePage} />
          <Route path={"/"} component={HomePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ReactRouter>
    </AuthProvider>
  );
}

export default App;
