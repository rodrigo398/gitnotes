import axios from "axios";

const fileEndpoint = (projectId, filePath) =>
  `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${filePath}/?ref=master`;

export const getFileAsync = async (projectId, filePath) => {
  // Encode file path to turn all "/" into "%2F"
  console.log(filePath);

  const { data } = await axios.get(
    fileEndpoint(projectId, encodeURIComponent(filePath))
  );

  // 64bit encoding to UTF8
  return atob(data.content);
};
