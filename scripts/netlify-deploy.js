/*eslint no-console: "off"*/
const axios = require("axios");
const AdmZip = require("adm-zip");

// A wrapper around the netlify rest api.
class NetlifyAPI {
  constructor(access_token) {
    this.access_token = access_token;
    this.baseUrl = "https://api.netlify.com/api/v1/";
  }

  // Gets a list of sites that are avaiable on netlify for the current user.
  async sites() {
    const url = this._baseUrl("sites");
    const response = await axios.get(url.href).catch(this._convertResonseError);
    return response.data;
  }

  // Gets a list of deployments for the given site, will return both past and
  // pending deployments.
  async deploys(siteId) {
    const url = this._baseUrl(`sites/${encodeURIComponent(siteId)}/deploys`);
    const response = await axios.get(url.href).catch(this._convertResonseError);
    return response.data;
  }

  // Deploies the given site to netlify using the zip file buffer, siteArchive.
  async deployArchive(siteId, siteArchive) {
    const url = this._baseUrl(`sites/${encodeURIComponent(siteId)}/deploys`);
    const response = await axios
      .post(url.href, siteArchive, {
        headers: { "Content-Type": "application/zip" }
      })
      .catch(this._convertResonseError);
    return response.data;
  }

  // Get a deploy by id.
  async deploy(deployId) {
    const url = this._baseUrl(`deploys/${encodeURIComponent(deployId)}`);
    const response = await axios.get(url.href).catch(this._convertResonseError);
    return response.data;
  }

  // Get all the metadata for a site.
  async metadata(siteId) {
    const url = this._baseUrl(`sites/${encodeURIComponent(siteId)}/metadata`);
    const response = await axios.get(url.href).catch(this._convertResonseError);
    return response.data;
  }

  // Set all the metadata for a site.
  async setMetadata(siteId, metadata) {
    const url = this._baseUrl(`sites/${encodeURIComponent(siteId)}/metadata`);
    const response = await axios
      .put(url.href, metadata)
      .catch(this._convertResonseError);
    return response.data;
  }

  // Maps common verbose response errors to human readable output that can be
  // printed on the CLI. Not all errors are handled and some just pass
  // through resulting in verbose messages that may not be of any help. If
  // any of these are found in the wild they should be handled here to give
  // clearer error messages.
  _convertResonseError(error) {
    const status = error.response.status;
    if (status === 401) {
      throw "Unauthorised, make sure NETLIFY_ACCESS_TOKEN environment variable is set correctly";
    } else if (status >= 500) {
      throw `Bad response from server: ${status} ${
        error.response.statusMessage
      }`;
    } else if (status >= 400) {
      // reaslly should handle each case with a nice error like above but
      // given the scope we can add these as we encounter them
      throw `Bad response from server - possible user error: ${status} ${
        error.response.statusMessage
      }. If you see this you should raise an issue: https://gitlab.com/skillcamp/gitnotes/issues/new?issue%5Bassignee_id%5D=&issue%5Bmilestone_id%5D=`;
    } else {
      // This should not happen, if it does a special case should be created
      // to give a nicer error message
      throw `Unknown error: ${error}. If you see this you should raise an issue: https://gitlab.com/skillcamp/gitnotes/issues/new?issue%5Bassignee_id%5D=&issue%5Bmilestone_id%5D=`;
    }
  }

  _baseUrl(endpoint) {
    const url = new URL(endpoint, this.baseUrl);
    url.searchParams.append("access_token", this.access_token);
    return url;
  }
}

// Zips up the build directory and returns a buffer containg the contents which
// can be uploaded to netlify.
function archiveBuild() {
  const zip = new AdmZip();
  zip.addLocalFolder("build");
  return zip.toBuffer();
}

function byNameNumber(a, b) {
  return parseInt(a.name.split("-")[1]) > parseInt(b.name.split("-")[1]);
}

// Claims a site for a deployment and to notify other builds not to
// use it. There is no way to do proper locks so this is very racey - this
// should not matter much un practice as build do not run that often and very
// rarely multiples at the same time and the worst case is one need to be
// rerun.
function claimSite(api, site, claimId) {
  site.metadata.claimDate = new Date().toISOString();
  site.metadata.claimId = claimId;
  api.setMetadata(site.id, site.metadata);
}

function diffDates(a, b) {
  return Math.abs(a.getTime() - b.getTime());
}

// Picks a unclaimed site or one that the claim has expired on and attempts to
// claim it.
async function pickSite(api, sites, claimId) {
  // See if we already have a claim on a site
  let site = sites.find(site => site.metadata.claimId == claimId);

  // Or see if there is an unclaimed site
  if (!site) {
    site = sites.find(
      site => !site.metadata.claimId || !site.metadata.claimDate
    );
  }

  // Or pick the site with the oldest claim
  if (!site) {
    site = sites.reduce((picked, current) => {
      if (
        new Date(picked.metadata.claimDate) <
        new Date(current.metadata.claimDate)
      ) {
        return picked;
      } else {
        return current;
      }
    });
  }

  if (site) {
    await claimSite(api, site, claimId);
    return site;
  }
}

// Main entry point
Promise.resolve(
  (async function() {
    const api = new NetlifyAPI(process.env.NETLIFY_ACCESS_TOKEN);
    const sites = await api.sites();

    const sitesWithMetadata = await Promise.all(
      sites.map(site => {
        return api.metadata(site.id).then(metadata => ({
          metadata,
          ...site
        }));
      })
    );
    sitesWithMetadata.sort(byNameNumber);

    const site = await pickSite(
      api,
      sitesWithMetadata,
      process.env.NETLIFY_CLAIM_ID
    );
    if (!site) {
      throw "No unclaimed sites, try again later";
    }

    console.log(`Chosen site ${site.name} for deployment`);

    const deploy = await api.deployArchive(site.id, archiveBuild());

    const start = new Date();
    while (diffDates(start, new Date()) < 1000 * 60 * 5) {
      const { state } = await api.deploy(deploy.id);
      if (state == "ready") {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`Deployed to ${site.name} at ${site.ssl_url}`);
  })().catch(error => {
    console.log(error);
    process.exit(1);
  })
);
