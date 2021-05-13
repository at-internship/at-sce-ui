const express = require("express");
const router = express.Router();
const packageJ = require("../../package.json");
const simpleGit = require("simple-git");
const git = simpleGit();

let getLastCommit = async () => {
  try {
    git.init().addRemote("origin", "https://github.com/at-internship/at-sce-ui.git").fetch().log();
    const results = await Promise.all([
      git.raw("rev-parse", "origin/" + getBranchCurrent()),
    ]);
    return results.toString().trim();
  } catch (error) {
    console.log(error);
  }
};

function getBranchCurrent() {
  if (process.env.NODE_ENV == "test") {
    return "develop";
  } else if (process.env.NODE_ENV == "production") {
    return "master";
  }
}
router.get("/", async (_req, res, _next) => {
  const healthcheck = {
    version: packageJ.version,
    uptime: process.uptime(),
    message: "LIVE",
    timestamp: Date.now(),
    branch: await getBranchCurrent(),
    commit: getLastCommit(),
    flags: {
      AT_SSO_SERVICE_URI_ENABLED: process.env.AT_SSO_SERVICE_URI_ENABLED,
      AT_SSO_WEB_TOKEN_ENABLED: process.env.AT_SSO_WEB_TOKEN_ENABLED,
      LOGIN_ENCRYPTION_ENABLED: process.env.LOGIN_ENCRYPTION_ENABLED,
      CREATE_USER_ENCRYPTION_ENABLED: process.env.CREATE_USER_ENCRYPTION_ENABLED,
      UPDATE_USER_ENCRYPTION_ENABLED: process.env.UPDATE_USER_ENCRYPTION_ENABLED,
    },
    services: {
      AT_SCE_SERVICE_URI: process.env.AT_SCE_SERVICE_URI,
      AT_SSO_SERVICE_URI: process.env.AT_SSO_SERVICE_URI,
    },
  };

  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

module.exports = router;
