import {
  PROJECTS_SYNCHRONIZING,
  PROJECTS_SYNCHRONIZED
} from "./projectsActionTypes";

const initialState = {
  synchronizedProjects: [],
  lastUpdateTime: undefined,
  synchronizing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS_SYNCHRONIZING: {
      return {
        ...state,
        synchronizing: true
      };
    }

    case PROJECTS_SYNCHRONIZED: {
      const { synchronizedProjects } = action.payload;
      return {
        synchronizedProjects,
        lastUpdateTime: new Date().toUTCString(),
        synchronizing: false
      };
    }

    default:
      return state;
  }
};
