import React from "react";
import styled from "styled-components";

const SwitchWrapper = styled.button`
  margin: 20px;
  width: 65px;
  height: 35px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${props => (props.enabled ? "#2db56f" : "#ffffff")};
  border-radius: 100px;
  border: 2px solid ${props => (props.enabled ? "#2db56f" : "#eeeeee")};
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
  transition: all ease 200ms;
  &:focus,
  :active {
    outline: none;
  }
`;

const SwitchButton = styled.span`
  height: 30px;
  width: 30px;
  position: absolute;
  left: 3px;
  transform: ${props => props.enabled && "translateX(27px)"};
  background-color: #ffffff;
  border-radius: 50%;
  box-shadow: ${props => (props.enabled ? "-3px" : "3px")} 0 5px
    rgba(0, 0, 0, 0.05);
  transition: all ease 200ms;
`;

export default ({ id, enabled, toggle }) => {
  return (
    <SwitchWrapper enabled={enabled} onClick={() => toggle(id)}>
      <SwitchButton enabled={enabled} />
    </SwitchWrapper>
  );
};
