import {
  PROJECTS_SYNCHRONIZING,
  PROJECTS_SYNCHRONIZED,
  PROJECTS_SYNCHRONIZATION_ERROR
} from "./projectsActionTypes";
import { ProjectsApi } from "../../api/gitlab";

const USER_PROJECTS_KEYS = "USER_PROJECTS";

const getCurrentAuthenticatedUserProjects = accessToken => {
  return async (dispatch, getState) => {
    dispatch({ type: PROJECTS_SYNCHRONIZING });

    const projects = await ProjectsApi.getCurrentlyAuthenticatedUserProjects(
      accessToken
    );
    let synchronizedProjects = projects;

    try {
      const persistedProjects = JSON.parse(
        localStorage.getItem(USER_PROJECTS_KEYS)
      );

      if (persistedProjects) {
        // TODO: optimisation
        synchronizedProjects = synchronizedProjects.map(synchronizedProject => {
          // TODO: should be O(1)
          const match = persistedProjects.first(
            p => synchronizedProject.id === p.id
          );

          if (match) {
            return {
              ...synchronizedProject,
              editable: match.editable
            };
          } else {
            return synchronizedProject;
          }
        });
      }
    } catch (error) {
      dispatch({
        type: PROJECTS_SYNCHRONIZATION_ERROR,
        payload: {
          error
        }
      });

      localStorage.removeItem(USER_PROJECTS_KEYS);
    }

    localStorage.setItem(
      USER_PROJECTS_KEYS,
      JSON.stringify(synchronizedProjects)
    );

    dispatch({
      type: PROJECTS_SYNCHRONIZED,
      payload: {
        synchronizedProjects
      }
    });
  };
};

const getSynchronizedProjects = () =>
  JSON.parse(localStorage.getItem(USER_PROJECTS_KEYS));

const saveSynchronizedProjects = projects =>
  localStorage.setItem(USER_PROJECTS_KEYS, JSON.stringify(projects));

const toggleProject = (synchronizedProjects, projectId) => {
  return synchronizedProjects.map(project => {
    if (project.projectId === projectId) {
      return {
        ...project,
        editable: !project.editable
      };
    } else {
      return project;
    }
  });
};

const toggleProjectEdition = projectId => {
  const synchronizedProjects = getSynchronizedProjects();

  if (synchronizedProjects) {
    const updatedProjects = toggleProject(synchronizedProjects, projectId);

    saveSynchronizedProjects(updatedProjects);

    return {
      type: PROJECTS_SYNCHRONIZED,
      payload: {
        synchronizedProjects: updatedProjects
      }
    };
  }
};

export { getCurrentAuthenticatedUserProjects, toggleProjectEdition };
