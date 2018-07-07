import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import {
  authenticateUser,
  logoutUser
} from "../state-management/authentication/authenticationActions";
import PropTypes from "prop-types";

class Login extends React.Component {
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
      return <Redirect to="/" />;
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
<<<<<<< HEAD
  isAuthenticated: PropTypes.bool.isRequired,
  authenticationInProgress: PropTypes.bool.isRequired
=======
  isAuthenticated: PropTypes.func.isRequired,
  authenticationInProgress: PropTypes.func.isRequired
>>>>>>> Change Switch component to class component and added propTypes to component
};

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
  logout: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);
