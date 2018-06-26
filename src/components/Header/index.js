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
import { colors } from "../../styles/styles";

const Wrapper = styled.div`
  min-width: 640px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 5px 10px;
  background-color: ${colors.darkGray};
  color: white;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`;

const GitNotesLogo = styled(Link)`
  margin: 0;
  color: ${colors.white};
  text-decoration: none;

  h1 {
    margin: 0;
  }
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
  color: ${colors.white};
  position: relative;
`;

const SettingsIcon = styled.img`
  height: 20px;
  width: 20px;
  background-color: transparent;

  &:hover {
    animation: ${spin} 2s infinite;
  }
`;

export class Header extends React.Component {
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
