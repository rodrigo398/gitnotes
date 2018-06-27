import React from "react";
import styled from "styled-components";
import arrowDownIcon from "../../images/arrow-down.svg";

const FolderDiv = styled.div`
  margin-left: 20px;
`;

const FolderButton = styled.button`
  height: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: inherit;
  color: inherit;
  border: none;

  p {
    margin: 0;
    font-size: 15px;
    font-weight: 100;
  }

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    background-color: ${props => props.theme.backgroundColor};
  }
`;

const EmptyFolder = styled.div`
  height: 25px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.emptyFolderColor};
  font-size: 12px;
  font-style: italic;
  margin-left: 8px;
`;

const ArrowIcon = styled.img`
  height: 10px;
  width: 10px;
  margin-right: 8px;
  transform: ${props => (props.open ? "rotate(0)" : "rotate(-90deg)")};
  transition: all 150ms ease;
`;

class Folder extends React.Component {
  state = {
    folderExpanded: false
  };

  toggleFolder = () =>
    this.setState(prevState => ({
      folderExpanded: !prevState.folderExpanded
    }));

  renderFolderContent = ({ tree }) => {
    return (
      this.state.folderExpanded && (
        <FolderDiv>
          {tree ? (
            this.props.parseBranch(tree)
          ) : (
            <EmptyFolder>no markdown..</EmptyFolder>
          )}
        </FolderDiv>
      )
    );
  };

  render() {
    const { folderExpanded } = this.state;
    const { child } = this.props;
    return (
      <div>
        <FolderButton onClick={this.toggleFolder}>
          <ArrowIcon src={arrowDownIcon} alt="arrow" open={folderExpanded} />
          <p>{child.name}</p>
        </FolderButton>
        {this.renderFolderContent(child)}
      </div>
    );
  }
}

export default Folder;
