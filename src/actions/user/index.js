import { UsersApi } from "../../api/gitlab";

const REQUEST_USER_DATA = "REQUEST_USER_DATA";
const SET_USER_DATA = "SET_USER_DATA";

const getCurrentUserData = accessToken => {
  return async dispatch => {
    dispatch({
      type: REQUEST_USER_DATA
    });

    const userData = await UsersApi.getCurrentlyAuthenticatedUser(accessToken);

    dispatch({
      type: SET_USER_DATA,
      payload: {
        ...userData
      }
    });
  };
};

export { getCurrentUserData, REQUEST_USER_DATA, SET_USER_DATA };
