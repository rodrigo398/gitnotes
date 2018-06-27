import React from "react";
import styled from "styled-components";
import Folder from "./Folder";
import File from "./File";
import arrowDownIcon from "../../images/arrow-down.svg";
import { colors } from "../../styles/styles";

const ProjectHeader = styled.button`
  width: calc(100% + 16px);
  height: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.theme4};
  border: none;
  padding-left: 8px;
  margin: 5px 0 5px -8px;
  font-size: 15px;
  color: white;
  font-weight: 600;
  letter-spacing: 0.4px;

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    background-color: ${colors.theme5};
  }
`;

const ProjectImage = styled.img`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const DefaultImage = styled.div`
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 16px;
  border-radius: 50%;
  background-color: ${colors.white};
  color: ${colors.theme2};
  margin-right: 8px;
`;

const ArrowIcon = styled.img`
  height: 10px;
  width: 10px;
  margin-left: 8px;
  transform: ${props => (props.open ? "rotate(0)" : "rotate(-90deg)")};
  transition: all 150ms ease;
`;

class Project extends React.Component {
  state = {
    projectExpanded: false
  };

  toggleProject = () =>
    this.setState(prevState => ({
      projectExpanded: !prevState.projectExpanded
    }));

  parseBranch = branch => {
    return Object.values(branch).map(child => {
      if (child.type === "tree") {
        return (
          <Folder key={child.id} child={child} parseBranch={this.parseBranch} />
        );
      } else {
        return <File key={child.id} name={child.name} />;
      }
    });
  };

  renderProjectIcon = ({ avatarUrl, name }) => {
    if (avatarUrl) {
      return <ProjectImage src={avatarUrl} alt={name} />;
    }
    return <DefaultImage>{name.charAt(0).toUpperCase()}</DefaultImage>;
  };

  render() {
    const { projectExpanded } = this.state;
    const { project } = this.props;
    return (
      <div>
        <ProjectHeader onClick={this.toggleProject}>
          {this.renderProjectIcon(project)}
          {project.name}
          <ArrowIcon src={arrowDownIcon} alt="arrow" open={projectExpanded} />
        </ProjectHeader>
        {projectExpanded &&
          project.projectRepositoryTree.tree &&
          this.parseBranch(project.projectRepositoryTree.tree)}
      </div>
    );
  }
}

export default Project;
