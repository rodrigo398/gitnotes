const projectEndoint = () =>
  "https://gitlab.com/api/v4/projects?owned=true&archived=false";

const getCurrentlyAuthenticatedUserProjectsAsync = async accessToken => {
  try {
    const response = await fetch(projectEndoint(), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (!data) return;

    return await Promise.all(
      data.map(async project => ({
        id: project.id,
        name: project.name,
        avatarUrl: project.avatar_url,
        path: project.path,
        creationData: project.created_at,
        lastUpdateData: project.last_activity_at,
        projectRespitoryTree: await getProjectTreeAsync(accessToken, project.id)
      }))
    );
  } catch (e) {
    return;
  }
};

const projectRepositoryTreeEndpoint = projectId =>
  `https://gitlab.com/api/v4/projects/${projectId}/repository/tree?recursive=true`;

const getProjectTreeAsync = async (accessToken, projectId) => {
  try {
    const response = await fetch(projectRepositoryTreeEndpoint(projectId), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (!data) return;
  } catch (e) {
    return;
  }
};

export default { getCurrentlyAuthenticatedUserProjectsAsync };
