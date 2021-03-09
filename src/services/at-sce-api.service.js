/**
 * AT SCE UI - AT SCE Service API.
 * Copyright 2020 AgileThought, Inc.
 *
 * Functions for at-sce-api.service endpoint.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// Constants
const axios = require("axios");
const AT_SCE_SERVICE = {};

// LOCAL
require("dotenv").config();
const AT_SCE_SERVICE_URI =
  process.env.AT_SCE_SERVICE_URI ||
  `https://at-sce-api.herokuapp.com/at-sce-api/api`;

// PROD
//const AT_SSO_SERVICE_URI = process.env.AT_SSO_SERVICE_URI;
//console.log("AT_SSO_SERVICE_URI:" + AT_SSO_SERVICE_URI);

// Operation: Get ALL USERS - GET/api/v1/users
AT_SCE_SERVICE.getAllUsers = () => {
  return axios({
    method: "GET",
    url: AT_SCE_SERVICE_URI + `/v1/users`,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log("Error: " + error.message);
  });
};

// Operation: Get USERS by ID - GET/api/v1/users/{id}
AT_SCE_SERVICE.getUsersById = () => {
  return {};
};

module.exports = AT_SCE_SERVICE;
