import { AuthenticationApi } from "../../api/gitlab";
import getCurrentUserData from "../user/userActions";
import { getCurrentAuthenticatedUserProjects } from "../projects/projectsActions";
import { updateAuthentication } from "../authentication/authenticationActions";

const initializeApplication = () => {
  return dispatch => {
    const authenticationData = AuthenticationApi.getAuthenticationData();

    dispatch(updateAuthentication(authenticationData));

    if (authenticationData !== undefined) {
      dispatch(getCurrentUserData(authenticationData.accessToken));

      dispatch(
        getCurrentAuthenticatedUserProjects(authenticationData.accessToken)
      );
    }
  };
};

export { initializeApplication };
