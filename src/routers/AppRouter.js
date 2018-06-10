import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import PageNotFound from "../components/PageNotFound";

export const history = createHistory();

export default () => (
  <Router history={history}>
    <div>
      <Header/>
      <Switch>
        <Route path="/" exact={true} component={LoginPage}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
);