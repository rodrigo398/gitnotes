import { REQUEST_USER_DATA, SET_USER_DATA } from "../actions/user";

const initialState = {
  name: undefined,
  avatarUrl: undefined,
  requestInProgress: undefined
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_DATA:
      return {
        requestInProgress: true
      };
    case SET_USER_DATA:
      return {
        name: action.payload.name,
        avatarUrl: action.payload.avatarUrl,
        requestInProgress: false
      };
    default:
      return state;
  }
};
