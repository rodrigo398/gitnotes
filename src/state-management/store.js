import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { authenticationReducer } from "./authentication";
import { userReducer } from "./user";
import { addReduxDevTools } from "./utils/addReduxDevTools";
import projectsReducer from "./projects/projectsReducer";

export const history = createBrowserHistory();

const initialState = {};

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  projects: projectsReducer
});

const composedEnhancers = compose(
  applyMiddleware(routerMiddleware(history), thunk),
  ...addReduxDevTools([])
);

export default createStore(
  connectRouter(history)(rootReducer),
  initialState,
  composedEnhancers
);
