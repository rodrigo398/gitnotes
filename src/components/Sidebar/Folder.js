import React from "react";
import styled from "styled-components";
import arrowDownIcon from "../../images/arrow-down.svg";

const FolderDiv = styled.div`
  margin-left: 20px;
`;

const FolderButton = styled.button`
  height: 30px;
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
  }

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    background-color: #405c80;
  }
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

  render() {
    const { folderExpanded } = this.state;
    const { parseBranch, child } = this.props;
    return (
      <div>
        <FolderButton onClick={this.toggleFolder}>
          <ArrowIcon src={arrowDownIcon} alt="arrow" open={folderExpanded} />
          <p>{child.name}</p>
        </FolderButton>
        {folderExpanded && <FolderDiv>{parseBranch(child.tree)}</FolderDiv>}
      </div>
    );
  }
}

export default Folder;
