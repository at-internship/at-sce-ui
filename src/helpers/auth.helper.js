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
const crypto = require("crypto");
const algorithm = "aes-256-ctr";
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv = crypto.randomBytes(16);
const helpers = {};

helpers.encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  console.log(`helper.encrypt - hash: ${encrypted}`);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
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
    if (req.user.type === 1) return next();
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
