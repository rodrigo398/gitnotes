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

    return nestProjectRepositoryTree(data);
  } catch (e) {
    if (e.response.status === 404) {
      // no tree was found for this given project Id,
      // we should return undefined instead of propagating this exception
      return;
    } else {
      // propagate other exceptions
      // throw.e
    }
  }
};

// Tree Data comes back from GitLab as one big array with every file having a
// path reference. This nests the data as it will be seen in the side bar
const nestProjectRepositoryTree = treeData => {
  const tree = [];
  treeData.forEach(child => {
    const object = child.path
      .split("/")
      .reverse()
      .reduce((acc, val, i) => {
        if (i === 0) {
          return {
            [val]: child
          };
        } else {
          return {
            [val]: {
              tree: { ...acc }
            }
          };
        }
      }, {});
    tree.push(object);
  });
  return merge.all(tree);
};

export default { getCurrentlyAuthenticatedUserProjectsAsync };
