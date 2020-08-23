import React from "react";
import {
  SignUp,
  Login,
  NotFound,
  Home,
  TaskPage,
  Profile,
  Random,
} from "../pages";
import { PrivateRoute } from "../components";
import { Route, Switch, BrowserRouter as ReactRouter } from "react-router-dom";

export function Router() {
  return (
    <ReactRouter>
      <Switch>
        <PrivateRoute exact={true} path={"/"} component={Home} />
        <PrivateRoute path={"/login"} component={Login} />
        <Route path={"/signup"} component={SignUp} />
        <Route path={"/group"} component={TaskPage} />
        <Route path={"/profile"} component={Profile} />
        <Route path={"/random"} component={Random} />
        <Route component={NotFound} />
      </Switch>
    </ReactRouter>
  );
}
