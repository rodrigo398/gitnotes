import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";

const DashboardWrapper = styled.div`
  height: calc(
    100vh - 50px
  ); // - header height (there is surely a better way to do this)
  width: 100vw;
  min-height: fit-content;
  min-width: fit-content;
  display: flex;
`;

export default () => (
  <DashboardWrapper>
    <Sidebar />
    <div>Notes Preview / Editor</div>
  </DashboardWrapper>
);
