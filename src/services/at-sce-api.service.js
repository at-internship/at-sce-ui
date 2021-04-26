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
const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI;
console.log(`AT_SCE_SERVICE_URI: ${AT_SCE_SERVICE_URI}`);

// Operation: Login - POST /api/v1/login
AT_SCE_SERVICE.login = (data) => {
  return axios({
    method: "POST",
    url: `${AT_SCE_SERVICE_URI}/v1/login`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  });
};

//US 31 REFACTOR in branch feature/AT-SOO-UI_AdminUser_Refactor Login - POST /api/v1/login
//New direction https://at-sso-api.herokuapp.com/api save on .env file like varible AT_SCE_SERVICE_URI
/*AT_SCE_SERVICE.login = (data) => {
  return axios({
    method: "POST",
    url: `${AT_SCE_SERVICE_URI}/v1/login`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  });
};*/

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

//US 31 REFACTOR in branch feature/AT-SOO-UI_AdminUser_Refactor Get ALL USERS - GET/api/v1/users
//New direction https://at-sso-api.herokuapp.com/api save on .env file like varible AT_SCE_SERVICE_URI
/*AT_SCE_SERVICE.getAllUsers = () => {
  return axios({
    method: "GET",
    url: `${AT_SCE_SERVICE_URI}/v1/users`,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log(`Error: ${error.message}`);
  });
};*/

// Operation: Get USER by ID - GET/api/v1/users/{id}
AT_SCE_SERVICE.getUserById = (id) => {
  return axios({
    method: "GET",
    url: `${AT_SCE_SERVICE_URI}/v1/users/${id}`,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log(`Error: ${error.message}`);
  });
};

 // US 31 REFACTOR in branch feature/AT-SOO-UI_AdminUser_Refactor Get USER by ID - GET/api/v1/users/{id}
 // New direction https://at-sso-api.herokuapp.com/api save on .env file like varible AT_SCE_SERVICE_URI
/*AT_SCE_SERVICE.getUserById = (id) => {
  return axios({
    method: "GET",
    url: `${AT_SCE_SERVICE_URI}/v1/users/${id}`,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log(`Error: ${error.message}`);
  });
};*/

// Operation; Create USER - POST /api/v1/users
AT_SCE_SERVICE.createUser = (data) => {
  return axios({
    method: "POST",
    url: `${AT_SCE_SERVICE_URI}/v1/users`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  })
};

// US 31 REFACTOR in branch feature/AT-SOO-UI_AdminUser_Refactor Create USER - POST /api/v1/users
// New direction https://at-sso-api.herokuapp.com/api save on .env file like varible AT_SCE_SERVICE_URI
/*AT_SCE_SERVICE.createUser = (data) => {
  return axios({
    method: "POST",
    url: `${AT_SCE_SERVICE_URI}/v1/users`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  })
};
*/

// Operation: Update USER - PUT /api/v1/users
AT_SCE_SERVICE.updateUser = (data) => {
  return axios({
    method: "PUT",
    url: `${AT_SCE_SERVICE_URI}/v1/users/${data.id}`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  })
};

// US 31 REFACTOR in branch feature/AT-SOO-UI_AdminUser_Refactor Update USER - PUT /api/v1/users
// New direction https://at-sso-api.herokuapp.com/api save on .env file like varible AT_SCE_SERVICE_URI
/*AT_SCE_SERVICE.updateUser = (data) => {
  return axios({
    method: "PUT",
    url: `${AT_SCE_SERVICE_URI}/v1/users/${data.id}`,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  })
};*/

// Operation: Delete USER - DELETE /api/v1/users/{id}
AT_SCE_SERVICE.deleteUser = (id) => {
  return axios({
    method: "DELETE",
    url: `${AT_SCE_SERVICE_URI}/v1/users/${id}`,
    headers: {
      "content-type": "application/json",
    },
  })
};

// US 31 REFACTOR in branch feature/AT-SOO-UI_AdminUser_Refactor Delete USER - DELETE /api/v1/users/{id}
// New direction https://at-sso-api.herokuapp.com/api save on .env file like varible AT_SCE_SERVICE_URI
/*AT_SCE_SERVICE.deleteUser = (id) => {
  return axios({
    method: "DELETE",
    url: `${AT_SCE_SERVICE_URI}/v1/users/${id}`,
    headers: {
      "content-type": "application/json",
    },
  })
};
*/

// Operation: Get HISTORY by USER -  GET /api/v1/histories?userid={id}
AT_SCE_SERVICE.getHistory = (id) => {
  return axios({
    method: "GET",
    url: `${AT_SCE_SERVICE_URI}/v1/histories?userid=${id}`,
    headers: {
      "content-type": "application/json",
    },
  }).catch(function (error) {
    console.log(`Error: ${error.message}`);
  });
};

// Operation: Save button POST /api/v1/histories?userid={id}
AT_SCE_SERVICE.createHistory = (data) => {
  return axios({
    method: "POST",
    url: `${AT_SCE_SERVICE_URI}/v1/histories?userid=${data.id} `,
    data: data,
    headers: {
      "content-type": "application/json",
    },
  })
};

module.exports = AT_SCE_SERVICE;
