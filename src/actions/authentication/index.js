import { AuthenticationApi } from "../../api/gitlab";
import { getCurrentUserData } from "../user";

const SET_AUTHENTICATION_STATUS = "SET_AUTHENTICATION_STATUS";

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

const getUserAuthenticationStatus = () => {
  return async (dispatch, getState) => {
    const authenticationData = AuthenticationApi.getAuthenticationData();
    if (authenticationData) {
      const { accessToken, tokenExpiration } = authenticationData;
      dispatch({
        type: SET_AUTHENTICATION_STATUS,
        payload: {
          isAuthenticated: true,
          authenticationInProgress: false,
          accessToken,
          tokenExpiration
        }
      });
      dispatch(getCurrentUserData());
    } else {
      dispatch({
        type: SET_AUTHENTICATION_STATUS,
        payload: {
          isAuthenticated: false,
          authenticationInProgress: false,
          accessToken: undefined,
          tokenExpiration: undefined
        }
      });
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

export {
  authenticateUser,
  getUserAuthenticationStatus,
  logoutUser,
  SET_AUTHENTICATION_STATUS
};
