import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Project from "./Project";

const SidebarWrapper = styled.div`
  height: calc(100vh - 50px);
  width: 250px;
  background-color: #506674;
  color: white;
  padding: 0 8px;
  box-sizing: border-box;
  overflow: scroll;
`;

const Sidebar = ({ projects }) => {
  const renderProjects = () => {
    return projects.filter(project => project.enabled).map(project => {
      return <Project project={project} />;
    });
  };

  return <SidebarWrapper>{renderProjects()}</SidebarWrapper>;
};

const mapStateToProps = ({ authentication, projects }) => ({
  projects: projects.synchronizedProjects
});

export default connect(mapStateToProps)(Sidebar);