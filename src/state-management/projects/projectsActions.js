import {
  PROJECTS_SYNCHRONIZING,
  PROJECTS_SYNCHRONIZED,
  PROJECTS_SYNCHRONIZATION_ERROR
} from "./projectsActionTypes";
import { ProjectsApi } from "../../api/gitlab";

const USER_PROJECTS_KEYS = "USER_PROJECTS";

const getCurrentAuthenticatedUserProjects = accessToken => {
  return async dispatch => {
    dispatch({ type: PROJECTS_SYNCHRONIZING });

    const projects = await ProjectsApi.getCurrentlyAuthenticatedUserProjectsAsync(
      accessToken
    );

    let synchronizedProjects = projects;

    try {
      const persistedProjects = JSON.parse(
        localStorage.getItem(USER_PROJECTS_KEYS)
      );

      if (persistedProjects) {
        // TODO: optimisation

        synchronizedProjects = [...synchronizedProjects].map(
          synchronizedProject => {
            // TODO: should be O(1)
            const match = persistedProjects.find(
              p => synchronizedProject.id === p.id
            );

            if (match) {
              return {
                ...synchronizedProject,
                enabled: match.enabled
              };
            } else {
              return synchronizedProject;
            }
          }
        );
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
    if (project.id === projectId) {
      return {
        ...project,
        enabled: !project.enabled
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
