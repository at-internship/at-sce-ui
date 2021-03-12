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
const bcrypt = require("bcryptjs");
const passport = require("passport");

// LOCAL
require("dotenv").config();
const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI || `https://at-sce-api.herokuapp.com/api`;

// PROD
//const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI;

console.log("AT_SCE_SERVICE_URI:" + AT_SCE_SERVICE_URI);

// Operation: Login - POST /api/v1/login
AT_SCE_SERVICE.login = (data) => {
  return axios({
      method: "POST",
      url: `${AT_SCE_SERVICE_URI}/v1/login`,
      data: data,
      headers: {
        "content-type": "application/json",
      },
    }).catch(function (error) {
      console.log("Error: " + error.message);
  });
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
    console.log("Error: " + error.message);
  });
};

// Operation: Get USERS by ID - GET/api/v1/users/{id}
AT_SCE_SERVICE.getUsersById = (id) => {
  return axios({
    method: "GET",
    url: `${AT_SCE_SERVICE_URI}/v1/users/`+id,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log("Error: " + error.message);
  });
};

//Match password
/*AT_SCE_SERVICE.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};*/

// Operation; Create USER - POST /api/v1/users
AT_SCE_SERVICE.createUser = () => {
  return {};
};
 
// Operation: Update USER - PUT /api/v1/users
AT_SCE_SERVICE.updateUser = () => {
  return {};
};
 
// Operation: Delete USER - DELETE /api/v1/users/{id}
AT_SCE_SERVICE.deleteUser = () => {
  return {};
};
module.exports = AT_SCE_SERVICE;
