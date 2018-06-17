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
    this.setState(prevState => ({ showUserMenu: !prevState.showUserMenu }));
  };

  render() {
    return (
      <UserDiv name="userMenu" onClick={this.toggleMenu}>
        <img className="avatar" src={this.props.avatar} alt={this.props.name} />
        <img className="arrow" src={arrowDownIcon} alt="arrow-down" />
        {this.state.showUserMenu && (
          <UserMenu
            name={this.props.name}
            logout={this.props.logout}
            showMenu={this.state.showUserMenu}
            closeMenu={this.toggleMenu}
          />
        )}
      </UserDiv>
    );
  }
}

export default User;
