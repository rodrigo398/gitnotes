import React from "react";
import styled from "styled-components";
import { moveInRight } from "../../styles/animations";
import { colors } from "../../styles/styles";

const MenuWrapper = styled.div`
  width: 200px;
  height: fit-content;
  position: absolute;
  background-color: ${colors.white};
  font-size: 13px;
  text-align: center;
  color: ${colors.darkGray3};
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 10px 10px ${colors.boxShadow};
  top: 55px;
  right: 14px;
  z-index: 100;
  animation: ${moveInRight} 200ms ease;
`;

const PointerWrapper = styled.div`
  width: 100%;
  height: 0;
  position: relative;
  z-index: 1;
`;

const Pointer = styled.span`
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: ${colors.white};
  transform: rotate(45deg);
  top: -6px;
  right: 32px;
`;

const ContentWrapper = styled.div`
  z-index: 10;
`;

const MenuItem = styled.button`
  width: 100%;
  min-height: 30px;
  background-color: transparent;
  font-size: 14px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.darkGray3};

  &:hover {
    background-color: ${colors.aliceblue};
  }
`;

const Logout = styled(MenuItem)`
  color: ${colors.red};
`;

const userMenu = props => (
  <MenuWrapper>
    <PointerWrapper>
      <Pointer />
    </PointerWrapper>
    <ContentWrapper>
      <p>{`Welcome, ${props.name}!`}</p>
      <hr />
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <Logout
        onClick={() => {
          props.logout();
        }}
      >
        Logout
      </Logout>
    </ContentWrapper>
  </MenuWrapper>
);

export default userMenu;
