/*eslint no-console: "off"*/
const axios = require("axios");
const { promisify } = require("util");
const fs = require("fs");
const readFileAsync = promisify(fs.readFile);

// Sends messages to the slack webhook API.
class Slack {
  constructor(webhook) {
    this.webhook = webhook;
  }

  async send_preview_build(branch, commit, job_url, url, author) {
    const short_commit = commit.substring(0, 10);
    const data = {
      attachments: [
        {
          fallback: `Deployed ${branch}:${commit} to ${url}`,
          color: "good",
          title: "Preview Build Published",
          title_link: url,
          text: `${author} deployed *${branch}*, commit _${short_commit}_ | <${job_url}|Build logs>\n`
        }
      ]
    };
    await axios.post(this.webhook, data);
  }

  async send_build_failure(branch, commit, job_url, author) {
    const short_commit = commit.substring(0, 10);
    const data = {
      attachments: [
        {
          fallback: `Build failed for ${branch}:${commit}, logs ${job_url}`,
          color: "danger",
          title: "Build Failure",
          title_link: job_url,
          text: `${author}'s build failed for *${branch}*, commit _${short_commit}_ | <${job_url}|Build logs>\n`
        }
      ]
    };
    await axios.post(this.webhook, data);
  }
}

// Main entry point
Promise.resolve(
  (async function() {
    const slack = new Slack(process.env.SLACK_WEBHOOK);
    try {
      const site = JSON.parse(await readFileAsync("deploy-site"));
      await slack.send_preview_build(
        process.env.CI_COMMIT_REF_NAME,
        process.env.CI_COMMIT_SHA,
        process.env.CI_JOB_URL,
        site.ssl_url,
        process.env.GITLAB_USER_NAME
      );
    } catch (_) {
      await slack.send_build_failure(
        process.env.CI_COMMIT_REF_NAME,
        process.env.CI_COMMIT_SHA,
        process.env.CI_JOB_URL,
        process.env.GITLAB_USER_NAME
      );
    }
  })().catch(error => {
    console.log(error);
    process.exit(1);
  })
);
