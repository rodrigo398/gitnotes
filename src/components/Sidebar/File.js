import React from "react";
import styled from "styled-components";

const FileWrapper = styled.div`
  color: green;
`;

const File = props => (
  <FileWrapper>
    <p>{props.name}</p>
  </FileWrapper>
);

export default File;
