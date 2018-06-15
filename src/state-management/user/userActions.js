import { UsersApi } from "../../api/gitlab";
import { REQUEST_USER_DATA, SET_USER_DATA } from "./userActionTypes";
import { getCurrentAuthenticatedUserProjects } from "../projects/projectsActions";

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

    dispatch(getCurrentAuthenticatedUserProjects(accessToken));
  };
};

export default getCurrentUserData;
