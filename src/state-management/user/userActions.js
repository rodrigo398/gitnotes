import { UsersApi } from "../../api/gitlab";
import { REQUEST_USER_DATA, SET_USER_DATA } from "./userActionTypes";

const getCurrentUserData = accessToken => {
  return async dispatch => {
    dispatch({
      type: REQUEST_USER_DATA
    });

    const userData = await UsersApi.getCurrentlyAuthenticatedUserAsync(
      accessToken
    );
    dispatch({
      type: SET_USER_DATA,
      payload: {
        ...userData
      }
    });
  };
};

export default getCurrentUserData;
