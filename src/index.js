import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import AppRouter from "./routers/AppRouter";
import registerServiceWorker from "./registerServiceWorker";

import "./index.css";

const AppWithStore = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouter />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<AppWithStore />, document.getElementById("root"));

registerServiceWorker();
