/**
 * AT SCE UI - AT SCE Service API.
 * Copyright 2021 AgileThought, Inc.
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
const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI || `https://at-sce-api.herokuapp.com/api`;

// PROD
//const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI;

console.log(`AT_SCE_SERVICE_URI: ${AT_SCE_SERVICE_URI}`);

// Operation: Login - POST /api/v1/login
AT_SCE_SERVICE.login = () => {
  return {};
};

// Operation: Get ALL USERS - GET/api/v1/users
AT_SCE_SERVICE.getAllUsers = () => {
  return axios({
    method: "GET",
    url: `${AT_SCE_SERVICE_URI}/v1/users`,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log(`Error: ${error.message}`);
  });
};

// Operation: Get USER by ID - GET/api/v1/users/{id}
AT_SCE_SERVICE.getUserById = () => {
  return {};
};

// Operation; Create USER - POST /api/v1/users
AT_SCE_SERVICE.createUser = (data) => {
  return axios({
    method: "POST",
    url: `${AT_SCE_SERVICE_URI}/v1/users`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log(`Error: ${error.message}`);
  });
};

// Operation: Update USER - PUT /api/v1/users

// Operation: Delete USER - DELETE /api/v1/users/{id}

module.exports = AT_SCE_SERVICE;
