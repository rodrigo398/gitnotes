import axios from "axios";

const USER_ENDPOINT = "https://gitlab.com/api/v4/user";

const getCurrentlyAuthenticatedUserAsync = async accessToken => {
  const response = await axios.get(USER_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const data = response.data;
  return {
    name: data.name,
    avatarUrl: data.avatar_url
  };
};

export default { getCurrentlyAuthenticatedUserAsync };
