import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from "../components/LoginPage";
import Dashboard from "../components/Dashboard";
import Settings from "../components/Settings";
import PageNotFound from "../components/PageNotFound";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

export default () => (
  <React.Fragment>
    <Header />
    <Switch>
      <Route path="/login" render={props => <LoginPage />} />
      <PrivateRoute path="/settings" component={Settings} />
      <PrivateRoute path="/" component={Dashboard} />
      <Route component={PageNotFound} />
    </Switch>
  </React.Fragment>
);
