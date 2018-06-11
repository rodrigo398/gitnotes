const USER_ENDPOINT = "https://gitlab.com/api/v4/user";

class UsersApi {
  async getCurrentlyAuthenticatedUser(accessToken) {
    try {
      const response = await fetch(USER_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      return {
        name: data.name,
        avatarUrl: data.avatar_url
      };
    } catch (e) {
      return undefined;
    }
  }
}

export default new UsersApi();
