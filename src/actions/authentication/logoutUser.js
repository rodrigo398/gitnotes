import { AuthenticationApi } from "../../api/gitlab";
import { SET_AUTHENTICATION_STATUS } from "./actionTypes";

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

export default logoutUser;
