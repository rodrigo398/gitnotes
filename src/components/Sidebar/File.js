import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const FileWrapper = styled.div`
  color: ${props => props.theme.fileWrapperColor};
  margin: 0;
`;

const FileButton = styled.button`
  height: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: inherit;
  color: inherit;
  border: none;
  font-size: 15px;
  font-weight: 100;

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    background-color: ${props => props.theme.backgroundColor};
  }
`;

const File = ({ projectId, child, history, theme }) => {
  const redirectToFile = () => {
    history.push(`/${projectId}/${child.path}`);
  };

  return (
    <FileWrapper theme={theme}>
      <FileButton onClick={redirectToFile} theme={theme}>
        {child.name}
      </FileButton>
    </FileWrapper>
  );
};

export default withRouter(File);
