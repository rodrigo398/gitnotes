import React from "react";
import styled from "styled-components";
import { getFileAsync } from "../../api/gitlab/fileApi";

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

const File = ({ projectId, child, onFileChange, theme }) => {
  const getFile = async () => {
    const data = await getFileAsync(projectId, child.path);
    onFileChange(data);
  };

  return (
    <FileWrapper theme={theme}>
      <FileButton onClick={getFile} theme={theme}>
        {child.name}
      </FileButton>
    </FileWrapper>
  );
};

export default File;
