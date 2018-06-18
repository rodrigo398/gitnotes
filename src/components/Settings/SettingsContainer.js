import Settings from "./Settings";
import {
  toggleProjectEdition,
  getCurrentAuthenticatedUserProjects
} from "../../state-management/projects/projectsActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({
  projects: { synchronizedProjects, lastUpdateTime }
}) => {
  return {
    synchronizedProjects,
    lastUpdateTime
  };
};

const mapDispatchToProps = dispatch => ({
  toggleProjectEdition: projectId => dispatch(toggleProjectEdition(projectId)),
  getCurrentAuthenticatedUserProjects: () =>
    dispatch(getCurrentAuthenticatedUserProjects())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settings)
);
