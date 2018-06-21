import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Folder from "./Folder";
import File from "./File";
import merge from "deepmerge";

const SidebarWrapper = styled.div`
  height: 100%;
  width: 200px;
  background-color: darkgray;
  color: white;
  padding: 10px;
`;

const Sidebar = ({ projects }) => {
  const enabledProjects = () =>
    projects.map(project => {
      if (project.enabled) {
        return project.projectRepositoryTree.map(child => {
          if (child.type === "tree" && child.path.split("/").length === 1) {
            return <Folder name={child.name} projectName={project.name} />;
          } else if (
            child.type === "blob" &&
            child.path.split("/").length === 1
          ) {
            return <File name={child.name} />;
          }
        });
      }
    });

  return (
    <SidebarWrapper>
      <p>Here is the sidebar</p>
    </SidebarWrapper>
  );
};

const mapStateToProps = ({ authentication, projects }) => ({
  projects: projects.synchronizedProjects
});

export default connect(mapStateToProps)(Sidebar);

// if (child.type === "blob"){
//
// }

// if (child.type === "tree"){
//   if (i === path.length - 1){
//     object = {
//       [path[i]]: child
//     }
//   }
//   else {
//     object = {
//       [path[i]]: { ...object }
//     }
//   }
// }
