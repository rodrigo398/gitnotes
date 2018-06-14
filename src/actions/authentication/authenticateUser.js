import { SET_AUTHENTICATION_STATUS } from "./actionTypes";
import { AuthenticationApi } from "../../api/gitlab";

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

export default authenticateUser;
