/**
 * AT SCE UI - AT SCE HELPER.
 * Copyright 2021 AgileThought, Inc.
 *
 * Functions for auth.helper.
 *
 * @author @at-internship
 * @version 1.0
 *
 */
// Constants
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);
const helpers = {};

/*helpers.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  let encrypted_update = cipher.update(text);
  console.debug(`helper.encrypt - encrypted_update: ${encrypted_update.toString("hex")}`);

  let encrypted_final = cipher.final();
  console.debug(`helper.encrypt - encrypted_final: ${encrypted_final.toString("hex")}`);

  const encrypted = Buffer.concat([encrypted_update, encrypted_final]);
  console.debug(`helper.encrypt - hash: ${encrypted.toString("hex")}`);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};*/

helpers.encrypt = (text) => {
  const md5sum = crypto.createHash("md5");
  const encrypted = md5sum.update(text).digest("hex");
  console.debug(`helper.encrypt - hash: ${encrypted}`);
  return {
    iv: iv.toString("hex"),
    content: encrypted,
  };
};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error_msg", "Not Authorized.");
  res.redirect("/signin");
};

helpers.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.data.type === 1) return next();
    else {
      req.flash("error_msg", "You are not allowed to do this.");
      res.redirect("back");
    }
  } else {
    req.flash("error_msg", "Not Authorized.");
    res.redirect("/signin");
  }
};

module.exports = helpers;
