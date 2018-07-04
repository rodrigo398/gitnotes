import React from "react";
import { connect } from "react-redux";

const PrivateComponent = ({ component: Component, isAuthenticated }) =>
  isAuthenticated && <Component />;

const mapStateToProps = ({ authentication }) => {
  return {
    isAuthenticated: authentication.isAuthenticated
  };
};

export default connect(mapStateToProps)(PrivateComponent);
