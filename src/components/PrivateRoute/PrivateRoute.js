import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = ({ authentication }) => {
  return {
    isAuthenticated: authentication.isAuthenticated
  };
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
