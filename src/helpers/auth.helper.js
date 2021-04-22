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
const helpers = {};
const JSEncrypt = require("node-jsencrypt");

// ENCRYPTION KEYS
const RSA_PUBLIC_ENCRYPTION_KEY = process.env.RSA_PUBLIC_ENCRYPTION_KEY;
const RSA_PRIVATE_ENCRYPTION_KEY = process.env.RSA_PRIVATE_ENCRYPTION_KEY;

helpers.encrypt = (text) => {
  const crypt = new JSEncrypt();
  crypt.setKey(RSA_PUBLIC_ENCRYPTION_KEY);
  return { content: crypt.encrypt(text) };
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
