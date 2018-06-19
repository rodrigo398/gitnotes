import React, { Component } from "react";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./state-management/store";
import Routes from "./routes";
import { connect } from "react-redux";
import { initializeApplication } from "./state-management/application/applicationActions";

class App extends Component {
  componentWillMount() {
    this.props.initializeApplication();
  }

  render() {
    return (
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  initializeApplication: () => dispatch(initializeApplication())
});

export default connect(
  undefined,
  mapDispatchToProps
)(App);
