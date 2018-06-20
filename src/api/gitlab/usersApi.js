import axios from "axios";

const USER_ENDPOINT = "https://gitlab.com/api/v4/user";

const getCurrentlyAuthenticatedUserAsync = async accessToken => {
  try {
    const response = await axios.get(USER_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const data = await response.data;
    return {
      name: data.name,
      avatarUrl: data.avatar_url
    };
  } catch (e) {
    return undefined;
  }
};

export default { getCurrentlyAuthenticatedUserAsync };
