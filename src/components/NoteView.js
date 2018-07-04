import React from "react";
import styled from "styled-components";
import MarkdownIt from "markdown-it";
import { getFileAsync } from "../api/gitlab/fileApi";

const NoteViewWrapper = styled.div`
  height: calc(100vh - 50px);
  width: calc(100vw - 250px);
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

class NoteView extends React.Component {
  state = {
    html: undefined
  };

  getFile = () => {
    const id = this.props.match.params.projectId;
    if (!id) {
      return;
    }
    const path = this.props.location.pathname.substring(id.length + 1);
    if (!path) {
      return;
    }

    getFileAsync(id, path).then(data => {
      const html = MarkdownIt().render(data);
      this.setState({ html });
    });
  };

  componentDidMount() {
    this.getFile();
  }

  componentDidUpdate(prevProps) {
    const prevPath = prevProps.location.pathname;
    const path = this.props.location.pathname;

    if (this.state.html && prevPath === path) {
      return;
    }
    this.getFile();
  }

  render() {
    const { html } = this.state;
    return (
      <NoteViewWrapper>
        <MarkdownWrapper>
          {this.state.html ? (
            <Markdown dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <p>Select A File To View...</p>
          )}
        </MarkdownWrapper>
      </NoteViewWrapper>
    );
  }
}

export default NoteView;
