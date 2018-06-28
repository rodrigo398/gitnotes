import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Project from "./Project";
import { sideBarTheme } from "../../styles/styles";

const SidebarWrapper = styled.div`
  height: calc(100vh - 50px);
  width: 250px;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.white};
  padding: 0 8px;
  box-sizing: border-box;
  overflow: scroll;
`;

const Sidebar = ({ projects, onFileChange }) => {
  const renderProjects = () => {
    return projects.filter(project => project.enabled).map(project => {
      return <Project
        project={project}
        theme={this.props.theme}
        onFileChange={onFileChange} />;
    });
  };

  return (
    <SidebarWrapper theme={sideBarTheme}>{renderProjects()}</SidebarWrapper>
  );
};

const mapStateToProps = ({ authentication, projects }) => ({
  projects: projects.synchronizedProjects
});

export default connect(mapStateToProps)(Sidebar);
