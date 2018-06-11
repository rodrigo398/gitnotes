import buildOAuthUrl from "./oAuthUrlBuilder";

const STATE_HASH_KEY = "stateHash";
const ACCESS_TOKEN_KEY = "access_token";
const EXPIRES_AT_KEY = "expires_at";

class AuthenticationService {
  constructor({ gitnotesApplicationId }) {
    this.gitnotesApplicationId = gitnotesApplicationId;
  }

  login = ({ returnUrl, stateHash }) => {
    const clientId = this.gitnotesApplicationId;

    localStorage.setItem(STATE_HASH_KEY, stateHash);

    window.location.replace(buildOAuthUrl({ clientId, returnUrl, stateHash }));
  };

  logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
  };

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT_KEY));
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) !== undefined &&
      new Date().getTime() < expiresAt
    );
  };

  hasValidOAuthResponse = () =>
    window.location.hash.indexOf(ACCESS_TOKEN_KEY) > -1 &&
    this.isOAuthResultValid();

  parseOAuthResult = () => {
    return (
      window.location.hash
        //omit the #
        .substring(1)
        //get an array of key=value pairs
        .split("&")
        //split key=value by = separator
        .map(value => value.split("="))
        //filter out non valid  keys
        .filter(arr => arr.length === 2)
        //create an object from each element
        .map(arr => ({
          key: decodeURIComponent(arr[0]),
          value: decodeURIComponent(arr[1])
        }))
        //transform to a map
        .reduce(function(map, { key, value }) {
          map[key] = value;
          return map;
        }, {})
    );
  };

  isOAuthResultValid = () =>
    this.parseOAuthResult()["state"] === localStorage.getItem(STATE_HASH_KEY);

  initializeSession = () => {
    const { access_token, expires_in } = this.parseOAuthResult();
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

    let expiresAt = JSON.stringify(
      (expires_in || 3600) * 1000 + new Date().getTime()
    );
    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
  };

  accessToken = () => {
    localStorage.getItem(ACCESS_TOKEN_KEY);
  };
}

export default AuthenticationService;
