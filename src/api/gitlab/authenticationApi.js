import configuration from "../../config";
import { STATE_HASH_KEY, ACCESS_TOKEN_KEY, EXPIRES_AT_KEY } from "./constants";

const buildOAuthUrl = ({
  clientId,
  callbackUrl,
  stateHash
}) => `https://gitlab.com/oauth/authorize?\
client_id=${clientId}\
&redirect_uri=${encodeURIComponent(callbackUrl)}\
&response_type=token\
&state=${encodeURIComponent(stateHash)};`;

const parseOAuthResult = () => {
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

class AuthenticationApi {
  _isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT_KEY));
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) !== undefined &&
      new Date().getTime() < expiresAt
    );
  }

  _getAccessTokenData() {
    return {
      accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
      tokenExpiration: localStorage.getItem(EXPIRES_AT_KEY)
    };
  }

  _hasValidOAuthResponse() {
    return (
      window.location.hash.indexOf(ACCESS_TOKEN_KEY) > -1 &&
      this._isOAuthResultValid()
    );
  }

  _isOAuthResultValid() {
    return parseOAuthResult()["state"] === localStorage.getItem(STATE_HASH_KEY);
  }

  _initializeSession() {
    const { access_token, expires_in } = parseOAuthResult();
    localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

    let expiresAt = JSON.stringify(
      (expires_in || 3600) * 1000 + new Date().getTime()
    );
    localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
  }

  getAuthenticationData() {
    if (this._hasValidOAuthResponse()) {
      this._initializeSession();
    }
    if (this._isAuthenticated()) {
      return this._getAccessTokenData();
    }
  }

  initateAuthentication({ callbackUrl, stateHash }) {
    const clientId = configuration.gitlab.gitnotesApplicationId;
    localStorage.setItem(STATE_HASH_KEY, stateHash);
    window.location.replace(
      buildOAuthUrl({ clientId, callbackUrl, stateHash })
    );
  }

  clearAuthentication() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
  }
}

export default new AuthenticationApi();
