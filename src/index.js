import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./state-management/store";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const AppWithStore = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<AppWithStore />, document.getElementById("root"));

registerServiceWorker();
