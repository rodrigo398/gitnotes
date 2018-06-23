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
&state=${encodeURIComponent(stateHash)}`;

const parseOAuthResult = () => {
  return (
    location.hash
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
      .reduce((map, { key, value }) => {
        map[key] = value;
        return map;
      }, {})
  );
};

const isAuthenticated = () => {
  const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT_KEY));
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) !== undefined &&
    new Date().getTime() < expiresAt
  );
};

const getAccessTokenData = () => ({
  accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
  tokenExpiration: localStorage.getItem(EXPIRES_AT_KEY)
});

const hasValidOAuthResponse = () =>
  location.hash.indexOf(ACCESS_TOKEN_KEY) > -1 && isOAuthResultValid();

const isOAuthResultValid = () => {
  return parseOAuthResult()["state"] === localStorage.getItem(STATE_HASH_KEY);
};

const initializeSession = () => {
  const { access_token, expires_in } = parseOAuthResult();
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

  let expiresAt = JSON.stringify((expires_in || 3600) * 1000 + Date.now());
  localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
};

const getAuthenticationData = () => {
  if (hasValidOAuthResponse()) {
    initializeSession();
  }
  if (isAuthenticated()) {
    return getAccessTokenData();
  }
};

const initateAuthentication = ({ callbackUrl, stateHash }) => {
  const clientId = configuration.gitlab.gitnotesApplicationId;
  localStorage.setItem(STATE_HASH_KEY, stateHash);
  location.replace(buildOAuthUrl({ clientId, callbackUrl, stateHash }));
};

const clearAuthentication = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
};

export default {
  clearAuthentication,
  initateAuthentication,
  getAuthenticationData
};
