import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutUser } from "../state-management/authentication/authenticationActions";

const Header = ({ logout, isAuthenticated, name, avatarUrl }) => (
  <div
    style={{
      width: "100%",
      height: "40px",
      backgroundColor: "#2c3840",
      color: "white",
      padding: "10px",
      display: "flex",
      alignItems: "center"
    }}
  >
    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
      <h1>GitNotes</h1>
    </Link>
    {isAuthenticated && (
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center"
        }}
      >
        <input type="text" />
        <Link to="/settings" style={{ color: "white" }}>
          Settings
        </Link>
        <button onClick={() => logout()}> Logout</button>
        <img
          style={{ height: "30px", borderRadius: "50%" }}
          src={avatarUrl}
          alt={name}
        />
        {name}
      </div>
    )}
  </div>
);

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
