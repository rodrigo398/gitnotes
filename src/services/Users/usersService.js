const CURRENT_USER_ENDPOINT = "https://gitlab.com/api/v4/user";

class UsersService {
  async getCurrentAuthenticatedUserProfile() {
    const headers = new Headers({
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    });

    const response = await fetch(CURRENT_USER_ENDPOINT, {
      headers
    });

    const result = await response.json();

    console.log(result);

    return result;
  }
}

export default UsersService;
