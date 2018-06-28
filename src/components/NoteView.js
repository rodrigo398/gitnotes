import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const NoteViewWrapper = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Markdown = styled(ReactMarkdown)`
  height: 100%;
  width: 100%;
  padding: 0 40px 0 40px;
  overflow: scroll;
`;

export default ({ file }) => (
  <NoteViewWrapper>
    <Markdown source={file} />
  </NoteViewWrapper>
);
