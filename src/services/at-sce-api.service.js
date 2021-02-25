/**
 * AT SCE UI - AT SCE Service API.
 * Copyright 2021 AgileThought, Inc.
 *
 * Functions for at-sce-api.service endpoint.
 *
 *
 * @version 1.0
 */

// Constants
const axios = require("axios");
const AT_SCE_SERVICE = {};

// LOCAL
require("dotenv").config();
const AT_SCE_SERVICE_URI =
  process.env.AT_SCE_SERVICE_URI || `https://at-sce-api.herokuapp.com/api`;

// PROD
//const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI;
//console.log("AT_SSO_SERVICE_URI:" + AT_SCE_SERVICE_URI);

AT_SCE_SERVICE.getAllUsers = () => {
  return axios({
    method: "GET",
    url: AT_SCE_SERVICE_URI + `/v1/user`,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log("Error: " + error.message);
  });
};

AT_SCE_SERVICE.addUser = (data) => {
  return axios({
    method: "POST",
    url: AT_SCE_SERVICE_URI + `/v1/user`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  });
};

module.exports = AT_SCE_SERVICE;
