import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ProjectsApi } from "../../api/gitlab";

const SidebarWrapper = styled.div`
  height: 100%;
  width: 200px;
  background-color: darkgray;
  color: white;
  padding: 10px;
`;

const Sidebar = ({ projects, token }) => {
  const enabledProjects = () =>
    projects.map(project => {
      if (project.enabled) {
        console.log(project);
        // console.log(ProjectsApi.getProjectTreeAsync(token, project.id));
        return <p>{project.name}</p>;
      }
    });

  return (
    <SidebarWrapper>
      <p>Here is the sidebar</p>
      {enabledProjects()}
    </SidebarWrapper>
  );
};

const mapStateToProps = ({ authentication, projects }) => ({
  token: authentication.accessToken,
  projects: projects.synchronizedProjects
});

// const mapDispatchToProps = dispatch => ({
//   logout: () => dispatch(logoutUser())
// });

export default withRouter(
  connect(
    mapStateToProps
    // mapDispatchToProps
  )(Sidebar)
);
