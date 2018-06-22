import axios from "axios";
import merge from "deepmerge";

const projectEndpoint = () =>
  "https://gitlab.com/api/v4/projects?owned=true&archived=false";

const getCurrentlyAuthenticatedUserProjectsAsync = async accessToken => {
  const { data } = await axios.get(projectEndpoint(), {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return await Promise.all(
    data.map(async project => ({
      id: project.id,
      name: project.name,
      avatarUrl: project.avatar_url,
      path: project.path,
      creationData: project.created_at,
      lastUpdateData: project.last_activity_at,
      projectRepositoryTree: await getProjectTreeAsync(accessToken, project.id)
    }))
  );
};

const projectRepositoryTreeEndpoint = projectId =>
  `https://gitlab.com/api/v4/projects/${projectId}/repository/tree?recursive=true&per_page=100`;

const getProjectTreeAsync = async (accessToken, projectId) => {
  try {
    const { data } = await axios.get(projectRepositoryTreeEndpoint(projectId), {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    return mapToProjectRepositoryTree(data);
  } catch (e) {
    if (e.response.status === 404 || e.response.status === 403) {
      // 404 - no tree was found for this given project Id,
      // we should return undefined instead of propagating this exception
      // 403 - Invalid read/write permissions on the repository
    } else {
      // propagate other exceptions
      throw e;
    }
  }
};

// Tree Data comes back from GitLab as one big array with every file having a
// path reference. This nests the data as it will be seen in the side bar
const mapToProjectRepositoryTree = treeData => {
  return merge.all(
    treeData
      .filter(child => {
        return (
          child.name.substring(child.name.length - 3) === ".md" ||
          child.type === "tree"
        );
      })
      .map(child => {
        return child.path
          .split("/")
          .reverse()
          .reduce((acc, val) => {
            return { tree: { [val]: acc } };
          }, child);
      })
  );
};

export default {
  getCurrentlyAuthenticatedUserProjectsAsync,
  mapToProjectRepositoryTree
};
