import React, { Component } from "react";
import styled from "styled-components";
import arrowDownIcon from "../../images/arrow-down.svg";
import UserMenu from "./UserMenu";

const UserDiv = styled.div`
  display: flex;
  background-color: transparent;
  border: none;
  cursor: pointer;

  .arrow {
    height: 8px;
    width: 8px;
    margin: 0 5px;
    align-self: center;
  }
  .avatar {
    height: 30px;
    width: 30px;
    border-radius: 50%;
  }
  &:active,
  :focus {
    outline: none;
  }
`;

class User extends Component {
  // Local UI State
  state = {
    showUserMenu: false
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      showUserMenu: !prevState.showUserMenu
    }));
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = e => {
    if (this.state.showUserMenu && !this.node.contains(e.target)) {
      this.toggleMenu();
    }
  };

  render() {
    const { avatar, name, logout } = this.props;
    const { showUserMenu } = this.state;
    return (
      <div ref={node => (this.node = node)}>
        <UserDiv name="userMenu" onClick={this.toggleMenu}>
          <img className="avatar" src={avatar} alt={name} />
          <img className="arrow" src={arrowDownIcon} alt="arrow-down" />

          {showUserMenu && (
            <UserMenu name={name} logout={logout} theme={this.props.theme} />
          )}
        </UserDiv>
      </div>
    );
  }
}

export default User;
