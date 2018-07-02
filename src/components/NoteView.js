import React from "react";
import styled from "styled-components";
import MarkdownIt from "markdown-it";

const NoteViewWrapper = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none; // hidden on safari & chrome
  }
`;

const MarkdownWrapper = styled.div`
  height: 100%;
  max-width: 650px;
  padding: 0 40px 0 40px;
`;

const Markdown = styled.div`
  color: #222222;
  padding-bottom: 20px;
`;

export default ({ file }) => (
  <NoteViewWrapper>
    <MarkdownWrapper>
      <Markdown
        dangerouslySetInnerHTML={{ __html: MarkdownIt().render(file) }}
      />
    </MarkdownWrapper>
  </NoteViewWrapper>
);
