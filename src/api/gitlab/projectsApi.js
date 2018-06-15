const PROJECTS_ENDPOINT =
  "https://gitlab.com/api/v4/projects?owned=true&archived=false";

const getCurrentlyAuthenticatedUserProjects = async accessToken => {
  try {
    const response = await fetch(PROJECTS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.json();

    if (!data) return;

    return data.map(project => ({
      id: project.id,
      name: project.name,
      avatarUrl: project.avatar_url,
      path: project.path,
      creationData: project.created_at,
      lastUpdateData: project.last_activity_at
    }));
  } catch (e) {
    return;
  }
};

export default { getCurrentlyAuthenticatedUserProjects };
