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

const RSA_PUBLIC_ENCRYPTION_KEY = process.env.RSA_PUBLIC_ENCRYPTION_KEY.replace(/\\n/gm,"\n");
const helpers = {};

helpers.encrypt = (text) => {
  const encryptedData = crypto.publicEncrypt(
    {
      key: RSA_PUBLIC_ENCRYPTION_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(text)
  );

  // The encrypted data is in the form of bytes, so we print it in base64 format
  // so that it's displayed in a more readable form
  console.log("encypted data: ", encryptedData.toString("base64"));

  return { content: encryptedData.toString() }; //Send the encrypted data (password)

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
