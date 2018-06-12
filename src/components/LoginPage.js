import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  authenticateUser,
  getUserAuthenticationStatus,
  logoutUser
} from "../actions/authentication";

class Login extends React.Component {
  componentDidMount() {
    this.props.checkAuthentication();
  }

  _authenticate() {
    this.props.login({
      callbackUrl: `${window.location.origin}/login`,
      stateHash: new Date().getTime()
    });
  }

  _logout() {
    this.props.logout();
  }

  _renderAuthenticationState() {
    if (this.props.isAuthenticated) {
      return (
        <div>
          <h2>Hello {this.props.name}, you are authenticated</h2>
          {this.props.avatarUrl && (
            <img src={this.props.avatarUrl} alt={this.props.name} />
          )}
          <button onClick={() => this._logout()}> Logout</button>
        </div>
      );
    } else if (this.props.authenticationInProgress) {
      return <h2>Authentication in progress</h2>;
    } else
      return (
        <div>
          <h2>You are not authenticated</h2>
          <button onClick={() => this._authenticate()}>
            Authenticate with your gitlab account !
          </button>
        </div>
      );
  }

  render() {
    return (
      <div>
        <p>Here is a Login Page</p>
        {this._renderAuthenticationState()}
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, user: { name, avatarUrl } }) => ({
  isAuthenticated: authentication.isAuthenticated,
  name,
  avatarUrl
});

const mapDispatchToProps = dispatch => ({
  login: ({ oAuthProvider, callbackUrl, stateHash }) =>
    dispatch(
      authenticateUser({
        oAuthProvider,
        callbackUrl,
        stateHash
      })
    ),
  logout: () => dispatch(logoutUser()),
  checkAuthentication: () => dispatch(getUserAuthenticationStatus())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
