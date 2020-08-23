import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { SignupPage } from "../pages";

export function Router() {
  return (
    <Switch>
      <Route to={""} component={SignupPage} />

      {/* <AnonRoute path="/signup" component={Signup} />
      <AnonRoute path="/login" component={Login} />
      <AnonRoute path="/group" component={Group} />
      <PrivateRoute path="/private" component={Private} />
      <PrivateRoute exact path="/tasks" component={TaskPage} />
      <PrivateRoute exact path="/profile" component={Profile} /> */}
    </Switch>
  );
}
