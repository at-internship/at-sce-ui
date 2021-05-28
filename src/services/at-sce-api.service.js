/**
 * AT SCE UI - AT SCE API Service.
 * Copyright 2021 AgileThought, Inc.
 *
 * Functions for at-sce-api endpoint.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// Constants
const axios = require("axios");
const AT_SCE_SERVICE = {};

// TODO: Just For Testing
// require("dotenv").config();

// MICROSERVICE - HEROKU - SCE
const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI;
console.debug(`at-sce-api.service - AT_SCE_SERVICE_URI: ${AT_SCE_SERVICE_URI}`);

// MICROSERVICE - HEROKU - SSO
const AT_SSO_SERVICE_URI = process.env.AT_SSO_SERVICE_URI;
console.debug(`at-sce-api.service - AT_SSO_SERVICE_URI: ${AT_SSO_SERVICE_URI}`);

// AT_SSO_SERVICE_URI_ENABLED FLAG
const AT_SSO_SERVICE_URI_ENABLED = process.env.AT_SSO_SERVICE_URI_ENABLED;
const AT_SERVICE_URI = (AT_SSO_SERVICE_URI_ENABLED == 'true') ? AT_SSO_SERVICE_URI : AT_SCE_SERVICE_URI;
console.log(`at-sce-api.service - AT_SERVICE_URI: ${AT_SERVICE_URI}`);

// AT_SSO_WEB_TOKEN_CLIENT & SECRET
const AT_SSO_WEB_TOKEN_CLIENT = process.env.AT_SSO_WEB_TOKEN_CLIENT;
const AT_SSO_WEB_TOKEN_SECRET = process.env.AT_SSO_WEB_TOKEN_SECRET;

const token = `${AT_SSO_WEB_TOKEN_CLIENT}:${AT_SSO_WEB_TOKEN_SECRET}`;
const authorization_token = Buffer.from(token).toString('base64'); 
console.debug("authorization_token-->", authorization_token );

/**************************** USERS Endpoints ****************************/

// Operation: Login - POST /api/v1/login
AT_SCE_SERVICE.login = (data) => {
  var qs = require('qs');
  
  return axios({
    method: "POST",
    url: `${AT_SERVICE_URI}/v1/login`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authorization_token}`
    },
    data: qs.stringify(data)
  });
};

// Operation: Get ALL USERS - GET/api/v1/users
AT_SCE_SERVICE.getAllUsers = () => {
  return axios({
    method: "GET",
    url: `${AT_SERVICE_URI}/v1/users`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${authorization_token}`
    },
  })
};

// Operation: Get USER by ID - GET/api/v1/users/{id}
AT_SCE_SERVICE.getUserById = (id) => {
  return axios({
    method: "GET",
    url: `${AT_SERVICE_URI}/v1/users/${id}`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${authorization_token}`
    },
  })
};

// Operation; Create USER - POST /api/v1/users
AT_SCE_SERVICE.createUser = (data) => {
  return axios({
    method: "POST",
    url: `${AT_SERVICE_URI}/v1/users`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${authorization_token}`
    },
  })
};

// Operation: Update USER - PUT /api/v1/users
AT_SCE_SERVICE.updateUser = (data) => {
  return axios({
    method: "PUT",
    url: `${AT_SERVICE_URI}/v1/users/${data.id}`,
    data: data,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${authorization_token}`
    },
  })
};

// Operation: Delete USER - DELETE /api/v1/users/{id}
AT_SCE_SERVICE.deleteUser = (id) => {
  return axios({
    method: "DELETE",
    url: `${AT_SERVICE_URI}/v1/users/${id}`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Basic ${authorization_token}`
    },
  })
};

/**************************** HISTORIES Endpoints ****************************/

// Operation: Get HISTORY by USER -  GET /api/v1/histories?userid={id}
AT_SCE_SERVICE.getHistory = (id, access_token) => {
  return axios({
    method: "GET",
    url: `${AT_SCE_SERVICE_URI}/v1/histories?userid=${id}`,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${access_token}`
    },
  })
};

// Operation: Save button POST /api/v1/histories?userid={id}
AT_SCE_SERVICE.createHistory = (data, access_token) => {
  return axios({
    method: "POST",
    url: `${AT_SCE_SERVICE_URI}/v1/histories?userid=${data.id} `,
    data: data,
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${access_token}`
    },
  })
};

module.exports = AT_SCE_SERVICE;