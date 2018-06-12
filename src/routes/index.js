import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from "../components/LoginPage";
import Dashboard from "../components/Dashboard";
import PageNotFound from "../components/PageNotFound";

export default (
  <React.Fragment>
    <Header />
    <Switch>
      <Route path="/" exact={true} component={Dashboard} />
      <Route path="/login" render={props => <LoginPage />} />
      <Route component={PageNotFound} />
    </Switch>
  </React.Fragment>
);
