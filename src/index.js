import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import AuthenticationService from "./Services/Authentication/authenticationService";
import configuration from "./config";

const authenticationService = new AuthenticationService({
  gitnotesApplicationId: configuration.gitlab.gitnotesApplicationId
});

ReactDOM.render(
  <App authenticationService={authenticationService} />,
  document.getElementById("root")
);
registerServiceWorker();
