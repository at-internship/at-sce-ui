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
const bcrypt = require("bcryptjs");
const helpers = {};

helpers.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(`helper.hashPassword - hash: ${hash}`);
  return {
    salt: salt,
    hashedPassword: hash,
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
