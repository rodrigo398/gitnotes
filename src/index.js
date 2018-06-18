import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./state-management/store";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<AppWithStore />, document.getElementById("root"));

registerServiceWorker();
