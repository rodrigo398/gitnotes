import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, name, avatarUrl }) => (
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
    <h1>GitNotes</h1>
    {isAuthenticated && <div>{name}</div>}
    {!isAuthenticated && <Link to="/login">Login</Link>}
  </div>
);

const mapStateToProps = ({ authentication, user: { name, avatarUrl } }) => {
  return {
    isAuthenticated: authentication.isAuthenticated,
    name,
    avatarUrl
  };
};

export default withRouter(connect(mapStateToProps)(Header));
