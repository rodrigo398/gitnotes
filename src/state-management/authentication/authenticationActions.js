import { SET_AUTHENTICATION_STATUS } from "./authenticationActionTypes";
import { AuthenticationApi } from "../../api/gitlab";

const mapAuthenticationDataToState = authenticationData => {
  return {
    isAuthenticated: authenticationData !== undefined,
    authenticationInProgress: authenticationData !== undefined,
    accessToken:
      authenticationData !== undefined
        ? authenticationData.accessToken
        : undefined,
    tokenExpiration:
      authenticationData !== undefined
        ? authenticationData.tokenExpiration
        : undefined
  };
};

const authenticateUser = ({ callbackUrl, stateHash }) => {
  AuthenticationApi.initateAuthentication({ callbackUrl, stateHash });
  return {
    type: SET_AUTHENTICATION_STATUS,
    payload: {
      authenticationInProgress: true,
      isAuthenticated: false,
      accessToken: undefined,
      tokenExpiration: undefined
    }
  };
};

const logoutUser = () => {
  AuthenticationApi.clearAuthentication();
  return {
    type: SET_AUTHENTICATION_STATUS,
    payload: {
      isAuthenticated: false,
      authenticationInProgress: false,
      accessToken: undefined,
      tokenExpiration: undefined
    }
  };
};

const updateAuthentication = authenticationData => {
  const state = mapAuthenticationDataToState(authenticationData);

  return {
    type: SET_AUTHENTICATION_STATUS,
    payload: {
      ...state
    }
  };
};

export { authenticateUser, logoutUser, updateAuthentication };
