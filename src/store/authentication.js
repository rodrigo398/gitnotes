import { SET_ANTHENTICATION_STATUS } from "../actions/authentication";

const initialState = {
  isAuthenticated: false,
  accessToken: undefined,
  tokenExpiration: undefined
};

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_ANTHENTICATION_STATUS:
      const { payload } = action;
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};
