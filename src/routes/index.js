import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from "../components/LoginPage";
import NoteView from "../components/NoteView";
import Settings from "../components/Settings";
import PageNotFound from "../components/PageNotFound";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import PrivateComponent from "./PrivateComponent";
import Sidebar from "../components/Sidebar";

import styled from "styled-components";

const Layout = styled.div`
  display: flex;
`;

export default () => (
  <React.Fragment>
    <Header />
    <Layout>
      <PrivateComponent component={Sidebar} />
      <Switch>
        <Route path="/login" render={props => <LoginPage />} />
        <PrivateRoute path="/settings" component={Settings} />
        <PrivateRoute path="/:projectId/" component={NoteView} />
        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  </React.Fragment>
);
