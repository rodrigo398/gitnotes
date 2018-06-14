import { SET_AUTHENTICATION_STATUS } from "./actionTypes";
import { AuthenticationApi } from "../../api/gitlab";
import { getCurrentUserData } from "../user";

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
      dispatch(getCurrentUserData(accessToken));
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

export default getUserAuthenticationStatus;
