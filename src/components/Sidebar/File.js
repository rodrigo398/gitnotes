import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/styles";

const FileWrapper = styled.div`
  color: ${colors.lightblue};
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
    background-color: ${colors.mediumGray3};
  }
`;

const File = props => (
  <FileWrapper>
    <FileButton>{props.name}</FileButton>
  </FileWrapper>
);

export default File;
