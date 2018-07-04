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
    html: "Select A File to View.."
  };

  getFile = () => {
    const id = this.props.match.params.projectId;
    const path = this.props.location.pathname.substring(id.length + 1);

    return getFileAsync(id, path).then(data => {
      const html = MarkdownIt().render(data);
      this.setState({ html });
    });
  };

  componentDidMount() {
    this.getFile();
  }

  componentDidUpdate(prevProps) {
    const prevId = prevProps.match.params.projectId;
    const id = this.props.match.params.projectId;
    const prevPath = prevProps.location.pathname.substring(prevId.length + 1);
    const path = this.props.location.pathname.substring(id.length + 1);

    if (prevPath !== path) {
      this.getFile();
    } else if (prevId !== id) {
      this.getFile();
    }
  }

  render() {
    const { html } = this.state;
    return (
      <NoteViewWrapper>
        <MarkdownWrapper>
          <Markdown dangerouslySetInnerHTML={{ __html: html }} />
        </MarkdownWrapper>
      </NoteViewWrapper>
    );
  }
}

export default NoteView;
