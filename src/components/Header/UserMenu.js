import React from "react";
import styled from "styled-components";

const MenuWrapper = styled.div`
  width: 200px;
  height: fit-content;
  position: absolute;
  background-color: white;
  font-size: 13px;
  text-align: center;
  color: #333;
  padding-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  top: 55px;
  right: 14px;
  z-index: 100;
  animation: moveInRight 200ms ease;

  @keyframes moveInRight {
    0% {
      opacity: 0;
      transform: translateX(-100px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
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
  background-color: white;
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
  color: #333;

  &:hover {
    background-color: aliceblue;
  }
`;

const Logout = styled(MenuItem)`
  color: #ee463e;
`;

class UserMenu extends React.Component {
  componentDidMount() {
    document.body.addEventListener("click", this.props.toggleMenu);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.props.toggleMenu);
  }

  render() {
    const { name, logout } = this.props;
    return (
      <MenuWrapper className="settings-menu">
        <PointerWrapper>
          <Pointer />
        </PointerWrapper>
        <ContentWrapper>
          <p>{`Welcome, ${name}!`}</p>
          <hr />
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <Logout
            onClick={() => {
              logout();
            }}
          >
            Logout
          </Logout>
        </ContentWrapper>
      </MenuWrapper>
    );
  }
}

export default UserMenu;
