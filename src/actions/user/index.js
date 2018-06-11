import { UsersApi } from "../../api/gitlab";

const REQUEST_USER_DATA = "REQUEST_USER_DATA";
const SET_USER_DATA = "SET_USER_DATA";

const getCurrentUserData = () => {
  return async (dispatch, getState) => {
    const { authentication } = getState();

    dispatch({
      type: REQUEST_USER_DATA
    });

    const userData = await UsersApi.getCurrentlyAuthenticatedUser(
      authentication.accessToken
    );

    dispatch({
      type: SET_USER_DATA,
      payload: {
        ...userData
      }
    });
  };
};

export { getCurrentUserData, REQUEST_USER_DATA, SET_USER_DATA };
