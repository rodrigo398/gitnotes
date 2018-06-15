import { SET_AUTHENTICATION_STATUS } from "./authenticationActionTypes";

const initialState = {
  isAuthenticated: false,
  accessToken: undefined,
  tokenExpiration: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION_STATUS: {
      const { payload } = action;
      return {
        ...state,
        ...payload
      };
    }

    default:
      return state;
  }
};
