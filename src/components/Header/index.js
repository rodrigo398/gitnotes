import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import User from "./User";
import { spin } from "../../styles/animations";
import { logoutUser } from "../../state-management/authentication/authenticationActions";
import settingsIcon from "../../images/settings.svg";

const Wrapper = styled.div`
  min-width: 640px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 5px 10px;
  background-color: #2c3840;
  color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`;

const GitNotesLogo = styled(Link)`
  margin: 0;
  color: white;
  text-decoration: none;
`;

const Toolbar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-wrapper {
    margin: 0 20px;
  }
  .tools-wrapper {
    min-width: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const Settings = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  position: relative;

  &hover .settings-menu {
    opacity: 1;
    transform: translateX(-200px);
  }
`;

const SettingsIcon = styled.img`
  height: 20px;
  width: 20px;
  background-color: transparent;

  &:hover {
    animation: ${spin} 2s infinite;
  }
`;

const Button = styled(Link)`
  height: 29px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 8px;
  font-weight: 400;
  letter-spacing: 0.5px;
  background: #2db56f;
  color: white;
  text-decoration: none;
  border-radius: 100px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #2ec08f;
  }
`;

class Header extends React.Component {
  render() {
    const { logout, isAuthenticated, name, avatarUrl } = this.props;
    return (
      <Wrapper>
        <GitNotesLogo to="/">
          <h1>GitNotes</h1>
        </GitNotesLogo>

        {isAuthenticated && (
          <Toolbar>
            <div className="search-wrapper">
              <SearchBar />
            </div>
            <div className="tools-wrapper">
              <Settings to="/settings">
                <SettingsIcon src={settingsIcon} alt="Settings" />
              </Settings>
              <User avatar={avatarUrl} name={name} logout={logout} />
            </div>
          </Toolbar>
        )}

        {!isAuthenticated && <Button to="/login">Login Page</Button>}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ authentication, user: { name, avatarUrl } }) => {
  return {
    isAuthenticated: authentication.isAuthenticated,
    name,
    avatarUrl
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
