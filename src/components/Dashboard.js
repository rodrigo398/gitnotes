import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import NoteView from "./NoteView";

const DashboardWrapper = styled.div`
  height: calc(
    100vh - 50px
  ); // - header height (there is surely a better way to do this)
  width: 100vw;
  min-height: fit-content;
  min-width: fit-content;
  display: flex;
`;

class Dashboard extends React.Component {
  state = {
    file: "Select a markdown file to view.."
  };

  onFileChange = file => this.setState({ file });

  render() {
    const { file } = this.state;
    return (
      <DashboardWrapper>
        <Sidebar onFileChange={this.onFileChange} />
        <NoteView file={file} />
      </DashboardWrapper>
    );
  }
}

export default Dashboard;
