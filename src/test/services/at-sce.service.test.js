/**
 * AT SCE UI - AT SCE Service API Test.
 * Copyright 2021 AgileThought, Inc.
 *
 * Test for at-sce-api.service endpoint.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// Constants
const expect = require("chai").expect;
const nock = require("nock");

// MICROSERVICE - HEROKU - SCE
const AT_SCE_SERVICE_API = require("../../services/at-sce-api.service");

// MICROSERVICE - HEROKU - SCE
const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI;

// MICROSERVICE - HEROKU - SS0
const AT_SSO_SERVICE_URI = process.env.AT_SSO_SERVICE_URI;

// AT_SSO_SERVICE_URI_ENABLED FLAG
const AT_SSO_SERVICE_URI_ENABLED = process.env.AT_SSO_SERVICE_URI_ENABLED;
const AT_SERVICE_URI = (AT_SSO_SERVICE_URI_ENABLED == 'true') ? AT_SSO_SERVICE_URI : AT_SCE_SERVICE_URI;
console.log(`at-sce.service.test - AT_SERVICE_URI: ${AT_SERVICE_URI}`);

// Operations
const login = AT_SCE_SERVICE_API.login
const login_error = AT_SCE_SERVICE_API.login

const getAllUsers = AT_SCE_SERVICE_API.getAllUsers;
const getAllUsers_error = AT_SCE_SERVICE_API.getAllUsers;

const createUser = AT_SCE_SERVICE_API.createUser;
const createUser_error = AT_SCE_SERVICE_API.createUser;

const updateUser = AT_SCE_SERVICE_API.updateUser;

const deleteUser = AT_SCE_SERVICE_API.deleteUser;
const deleteUser_error = AT_SCE_SERVICE_API.deleteUser;

const getUserById = AT_SCE_SERVICE_API.getUserById;
const getUserById_error = AT_SCE_SERVICE_API.getUserById;

const getHistory = AT_SCE_SERVICE_API.getHistory;
const getHistory_error = AT_SCE_SERVICE_API.getHistory;

const createHistory = AT_SCE_SERVICE_API.createHistory;
const createHistory_error = AT_SCE_SERVICE_API.createHistory;

// Mock Responses
const data = {};

// USERS
const users_response = {
  body: {
    id: "604fc4def21087344f67ea38",
    firstName: "firstTest",
    lastName: "lastTest",
    email: "admin.test@agilethought.com",
    status: 1,
    type: 2,
  },
  status: 200
};

const users_response_BadRequest = {
  body: {
    timestamp: "2020-12-02T17:46:32.409+00:00",
    status: 400,
    error: "Bad Request",
    message: "The priority field only accepts 3 values {High, Medium, Low}",
    path: "/users",
  },
  status: 400
};

const users_data_add = {
  firstName: "Guillermo",
  lastName: "Ochoa",
  email: "Ochoa@hotmail.com",
  password: "jp23ba12b",
  status: 1,
  type: 2,
};

const users_response_add = {
  body: {
    id: "604f8e2dac1a413c8aba77a5",
  },
  status: 200
};

const users_data_add_error = {
  email: "isabel.suarez@agilethought.com",
  firstName: "Isabel",
  lastName: "Suarez",
  password: "isabel",
  status: 1,
  type: 2
};

const users_response_add_BadRequest = {
  body: {
    timestamp: "2021-04-30T04:45:47.208",
    status: 400,
    error: "Bad Request",
    message: "One or more fields are invalid",
    path: "/api/v1/users",
    details:[
      {
        fieldName: "Password",
        errorMessage: "Invalid input on field Password. Correct format is: 10 characters minimum with at least one lowercase letter, one uppercase letter, and one number."
      }
    ]
  },
  status:400
};

const userResponse_GetUserById = {
  body:{
    id: "604fc4def21087344f67ea38",
    type: 1,
    firstName: "admin",
    lastName: "AT",
    email: "admin@agilethought.com",
    status: 1
  },
  status:200
}; 

const userResponse_GetUserById_NotFound = {
  body:{
    timestamp: "2021-04-27T22:47:33.661",
    status: 404,
    error: "Not Found",
    message: "User was not found with the given id: 604fc4def21087344f67ea39",
    path: "/api/v1/users/604fc4def21087344f67ea39",
    details: null
  },
  status:404
};

const userData_Login = {
  email: "admin@agilethought.com",
  password: "4Gil3th0ught"
};

const userResponse_Login = {
  body:{
    id: "604fc4def21087344f67ea38"
  },
  status:200
};

const userData_Login_Unauthorized = {
  email: "admin@agilethought.com",
  password: "4gil3th0ught"
};

const userResponse_Login_Unauthorized = {
  body:{
    timestamp: "2021-04-29T06:52:54.621",
    status: 401,
    error: "Unauthorized",
    message: "Invalid login credentials.",
    path: "/api/v1/login",
    details: null
  },
  status:401
};

const userData_Update = {
  email: "prueba123@agilethought.com",
  firstName: "Prueba123",
  id: "123456",
  lastName: "Prueba123",
  password: "Prueba123",
  status: 1,
  type: 2
};

const userResponse_Update = {
  body: {
    email: "prueba123@agilethought.com",
    firstName: "Prueba123",
    id: "123456",
    lastName: "Prueba123",
    password: "Prueba123",
    status: 1,
    type: 2
  },
  status: 200
};

const userResponse_Delete_NotFound = {
  body:{
    timestamp:"2021-04-29T07:19:32.961",
    status:404,
    error:"Not Found",
    message:"User was not found with the given id: 604fc4def21087344f67ea38",
    path:"/api/v1/users/604fc4def21087344f67ea38",
    details:null
  },
  status:404
};

const userResponse_Delete = {};

  
// HISTORIES

const historyResponse = {
  body: {
    costDay: 320.8,
    costHour: 35,
    creationDate: "04-15-2021",
    fixedExpenses: {
      feed: 200.0,
      internet: 1000.0,
      others: 100.0,
      rent: 7000.0,
      total: 9300.0,
      transport: 1000.0,
  },
    id: "6064f7c9691a1d135326a029",
    projectCost: 20000.0,
    revenue: 9766.0,
    status: 1,
    taxISR_r: 2000.0,
    taxIVA: 3200.0,
    taxIVA_r: 2134.0,
    total: 7334.0,
    totalDays: 100,
    totalHours: 8,
    type: 1,
    user_id: "604fc4def21087344f67ea38",
  },
  status: 200,
};

const historyResponse_EmptyArray = {
    body:[]
};

const historyData_add = {
  costDay: 320.8,
  costHour: 35,
  fixedExpenses: {
    feed: 1200.99,
    internet: 349,
    others: 200.0,
    rent: 6000.0,
    total: 7829.99,
    transport: 80.0,
  },
  projectCost: 5637.3,
  revenue: 3588.3,
  status: 1,
  taxISR_r: 2328.9,
  taxIVA: 600.0,
  taxIVA_r: 599.99,
  total: 10000.0,
  totalDays: 14,
  totalHours: 10,
  type: 1,
  id: "604fc4def21087344f67ea38",
};

const historyResponse_add = {
  body: {
    id: "12345678910",
  },
  status: 201,
};

const historyData_add_BadRequest = {
  costDay: 320.8,
  costHour: 35,
  fixedExpenses: {
    feed: 1200.99,
    internet: 349.0,
    others: 200.0,
    rent: 6000.0,
    total: 100.0,
    transport: 80.0,
  },
  projectCost: 5637.3,
  revenue: 3588.3,
  status: 1,
  taxISR_r: 2328.9,
  taxIVA: 600.0,
  taxIVA_r: 599.99,
  total: 10000.0,
  totalDays: 14,
  totalHours: 10,
  type: 1,
  id: "604fc4def21087344f67ea38",
};

const historyResponse_add_BadRequest = {
  body: {
    timestamp: "2021-04-27T14:40:14.228+00:00",
    status: 400,
    error: "Bad Request",
    message:
      "Invalid input on field Total. Correct format is: A number equal to the sum of all other fields in the Fixed Expenses section.",
    path: "/api/v1/histories",
  },
  status: 400,
};

describe("TEST: at-sce-api.service.js", () => {

  beforeEach(() => {
    nock(AT_SERVICE_URI).get("/v1/users").reply(200, users_response);
    nock(AT_SERVICE_URI).get("/v1/users").reply(400, users_response_BadRequest);

    nock(AT_SERVICE_URI).post("/v1/users").reply(200, users_response_add);
    nock(AT_SERVICE_URI).post("/v1/users").reply(400, users_response_add_BadRequest);

    nock(AT_SERVICE_URI).get("/v1/users/604fc4def21087344f67ea38").reply(200, userResponse_GetUserById);
    nock(AT_SERVICE_URI).get("/v1/users/604fc4def21087344f67ea39").reply(404, userResponse_GetUserById_NotFound);

    nock(AT_SERVICE_URI).post("/v1/login").reply(200, userResponse_Login);
    nock(AT_SERVICE_URI).post("/v1/login").reply(401, userResponse_Login_Unauthorized);

    nock(AT_SERVICE_URI).put("/v1/users/123456").reply(200, userResponse_Update);
    //nock(AT_SERVICE_URI).put("/v1/users/123456").reply(400, userResponse_Update_error);

    nock(AT_SERVICE_URI).delete("/v1/users/604fc4def21087344f67ea38").reply(204, userResponse_Delete);  
    nock(AT_SERVICE_URI).delete("/v1/users/604fc4def21087344f67ea38").reply(404, userResponse_Delete_NotFound);

    nock(AT_SERVICE_URI).get("/v1/histories?userid=604fc4def21087344f67ea38").reply(200, historyResponse);
    nock(AT_SERVICE_URI).get("/v1/histories?userid=604fc4def21087344f67ea39").reply(200, historyResponse_EmptyArray);
    
    nock(AT_SERVICE_URI).post("/v1/histories?userid=604fc4def21087344f67ea38").reply(201, historyResponse_add);
    nock(AT_SERVICE_URI).post("/v1/histories?userid=604fc4def21087344f67ea38").reply(400, historyResponse_add_BadRequest);
  });

  // Operation: Get ALL USERS - GET/api/v1/users - BE Success (Happy Path)
  it("Should Get All Users - Call GET/api/v1/users - BE Success (Happy Path)", () => {
    return getAllUsers().then((users_response) => {      
      // Response Status
      expect(users_response).to.have.status(200);

      // Response
      expect(users_response.data.body).to.have.property("id");
      expect(users_response.data.body).to.have.property("id");
    });
  });

  // Operation: Get ALL USERS - GET/api/v1/users - BE Error - 400 Bad Request
  it("Should Get All Users - Call GET/api/v1/users - BE Error - 400 Bad Request", () => {
    return getAllUsers_error().then((response) => {

    }).catch((error)=>{
        expect(error.response.status).to.equal(400);
        expect(error.response.data.body.error).to.equal("Bad Request");
    });
  });

  it("Should Create User - Call POST /api/v1/users - BE Success (Happy Path)", () => {
    return createUser(users_data_add).then((response_add) => {
      // Response Status
      expect(response_add.status).to.equal(200);

      // Response
      expect(response_add.data.body).to.have.property("id");
      expect(response_add.data.body).to.have.property("id").equals("604f8e2dac1a413c8aba77a5")
    });
  });

  it("Should Create User - Call POST /api/v1/users - BE Error - 400 Bad Request", () => {
    return createUser_error(users_data_add_error).then((response) => {
     
    }).catch((error)=>{
        expect(error.response.status).to.equal(400);
        expect(error.response.data.body.error).to.equal("Bad Request");
    });
  });

  it("Should Get All History - Call GET /api/v1/histories?userid={id} - BE Success (Happy Path)", () => {
    return getHistory("604fc4def21087344f67ea38").then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.have.property("id");
      expect(response.data.body).to.have.property("id").equals("6064f7c9691a1d135326a029");
    });
  });

  it("Should Get All History - Call GET /api/v1/histories?userid={id} - BE Success (Happy Path)-Empty Array", () => {
    return getHistory_error("604fc4def21087344f67ea39").then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.be.an("array").that.is.empty;
    });
  });

  it("Should Create Histor - Call POST /api/v1/histories?userid={id} - BE Success (Happy Path)", () => {
    return createHistory(historyData_add).then((response) => {
      // Response Status
      expect(response.status).to.equal(201);

      // Response
      expect(response.data.body).to.have.property("id");
      expect(response.data.body.id).to.equal("12345678910");
    });
  });

  it("Should Create History - Call POST /api/v1/histories?userid={id} - BE Error - 400 Bad Request", () => {
    return createHistory_error(historyData_add_BadRequest).then((response) => {

    }).catch((error)=>{
        expect(error.response.status).to.equal(400);
        expect(error.response.data.body.error).to.equal("Bad Request");
    });
  });

  it("Should Get User By Id - Call GET/api/v1/users/{id} - BE Success (Happy Path)",()=>{
    return getUserById('604fc4def21087344f67ea38').then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.have.property("id");
    });
  });


  it("Should Get User By Id - Call GET/api/v1/users/{id} - BE Error - 404 Not Found",()=>{
    return getUserById_error('604fc4def21087344f67ea39').then((response) => {

    }).catch((error) => {
        expect(error.response.status).to.equal(404);
        expect(error.response.data.body.error).to.equal("Not Found");
    });
  });

  it("Should Do Login - Call POST /api/v1/login - BE Success (Happy Path)",()=>{
    return login(userData_Login).then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.have.property("id");
    });
  });

  it("Should do Login - Call POST /api/v1/login - BE Error - 401 Unauthorized)",()=>{
    return login_error(userData_Login_Unauthorized).then((response) => {

    }).catch((error)=>{
        expect(error.response.status).to.equal(401);
        expect(error.response.data.body.error).to.equal("Unauthorized");
    });
  });

  it("Should Update User - PUT /api/v1/users - BE Success (Happy Path)",()=>{
    return updateUser(userData_Update).then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.have.property("id");
      expect(response.data.body).to.have.property("id").equals("123456");
    });
  });

  it("Should Delete User - Call DELETE /api/v1/users/{id} - BE Success (Happy Path)",()=>{
    return deleteUser("604fc4def21087344f67ea38").then((response) => {
      // Response Status
      expect(response.status).to.equal(204);

      // Response
      expect(response.data).to.be.empty;
    });
  });
  
  it("Should Delete -  Call DELETE /api/v1/users/{id} - BE Error - 404 Not Found",()=>{
    return deleteUser_error('604fc4def21087344f67ea38').then((response) => {
     
    }).catch((error)=>{
        expect(error.response.status).to.equal(404);
        expect(error.response.data.body.error).to.equal("Not Found");
    });
  });

});
