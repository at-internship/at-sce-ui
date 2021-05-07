const express = require("express");
const router = express.Router();
var packageJ = require("../../package.json");
const { execSync } = require("child_process");

function getGitCommitHash() {
  return execSync("git rev-parse HEAD").toString().trim();
}
function getGitNameBranch() {
  return execSync("git name-rev --name-only HEAD").toString().trim();
}
router.get("/", async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    version: packageJ.version,
    uptime: process.uptime(),
    message: "LIVE",
    timestamp: Date.now(),
    branch: getGitNameBranch(),
    commit: getGitCommitHash(),
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
