import React from "react";
import UsersService from "../services/Users/usersService";

class Login extends React.Component {
  state = {
    isAuthenticated: false
  };

  async componentDidMount() {
    if (!this.props.authentication.hasValidOAuthResponse()) return;

    this.props.authentication.initializeSession();

    const isAuthenticated = this.props.authentication.isAuthenticated();

    this.setState({
      isAuthenticated
    });

    if (isAuthenticated) {
      await this._getAuthenticatedUserInfo();
    }
  }

  async _getAuthenticatedUserInfo() {
    const userService = new UsersService();
    await userService.getCurrentAuthenticatedUserProfile();
  }

  _authenticate() {
    this.props.authentication.login({
      returnUrl: `${window.location.origin}/login`,
      stateHash: new Date().getTime()
    });
  }

  _renderAuthenticationState() {
    if (this.state.isAuthenticated) {
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
      <div>
        <p>Here is a Login Page</p>
        {this._renderAuthenticationState()}
      </div>
    );
  }
}

export default Login;
