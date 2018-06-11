import configuration from "../config";

const initialState = {
  gitlabAccessConfiguration: configuration.gitlab
};

export default (state = initialState, action) => {
  return state;
};
