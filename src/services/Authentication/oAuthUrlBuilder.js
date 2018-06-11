const buildOAuthUrl = ({
  clientId,
  returnUrl,
  stateHash
}) => `https://gitlab.com//oauth/authorize?\
client_id=${clientId}\
&redirect_uri=${encodeURIComponent(returnUrl)}\
&response_type=token\
&state=${encodeURIComponent(stateHash)};`;

export default buildOAuthUrl;
