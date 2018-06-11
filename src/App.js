import React, { Component } from "react";
import propTypes from "prop-types";
import "./App.css";
import AuthenticationService from "./Services/Authentication/authenticationService";

class App extends Component {
  _authenticate() {
    this.props.authenticationService.login({
      returnUrl: window.location.origin,
      stateHash: "helloworld"
    });
  }

  _renderAuthenticationState() {
    if (this.props.authenticationService.hasValidOAuthResponse()) {
      this.props.authenticationService.initializeSession();
    }

    if (this.props.authenticationService.isAuthenticated()) {
      return <h2>Hello sir, you are authenticated</h2>;
    } else {
      return (
        <div>
          <h2>You are not authenticated</h2>
          <button onClick={() => this._authenticate()}>
            Authenticate with your gitlab account !
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Gitnotes</h1>
        </header>
        {this._renderAuthenticationState()}
      </div>
    );
  }
}

App.propTypes = {
  authenticationService: propTypes.instanceOf(AuthenticationService)
};
export default App;
