import axios from "axios";

const projectEndoint = () =>
  "https://gitlab.com/api/v4/projects?owned=true&archived=false";

const getCurrentlyAuthenticatedUserProjectsAsync = async accessToken => {
  const response = await axios.get(projectEndoint(), {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return await Promise.all(
    response.data.map(async project => ({
      id: project.id,
      name: project.name,
      avatarUrl: project.avatar_url,
      path: project.path,
      creationData: project.created_at,
      lastUpdateData: project.last_activity_at,
      projectRespitoryTree: await getProjectTreeAsync(accessToken, project.id)
    }))
  );
};

const projectRepositoryTreeEndpoint = projectId =>
  `https://gitlab.com/api/v4/projects/${projectId}/repository/tree?recursive=true`;

const getProjectTreeAsync = async (accessToken, projectId) => {
  try {
    const response = await axios.get(projectRepositoryTreeEndpoint(projectId), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return response.data;
  } catch (e) {
    if (e.response.status === 404) {
      // no tree was found for this given project Id,
      // we should return undefined instead of propagating this exception
      return;
    } else {
      // propagate other exceptions
      throw e;
    }
  }
};

export default { getCurrentlyAuthenticatedUserProjectsAsync };
