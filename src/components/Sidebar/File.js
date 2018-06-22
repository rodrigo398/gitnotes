import React from "react";
import styled from "styled-components";

const FileWrapper = styled.div`
  color: lightblue;
  margin: 0;
`;

const FileButton = styled.button`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: inherit;
  color: inherit;
  border: none;
  font-size: 15px;

  &:focus,
  :active {
    outline: none;
  }

  &:hover {
    background-color: #405c80;
  }
`;

const File = props => (
  <FileWrapper>
    <FileButton>{props.name}</FileButton>
  </FileWrapper>
);

export default File;
