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

// Operations
const getAllUsers = AT_SCE_SERVICE_API.getAllUsers;
const getAllUsers_error = AT_SCE_SERVICE_API.getAllUsers;
const createUser = AT_SCE_SERVICE_API.createUser;

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

const users_response_error = {
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
  body: [],
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
    id: "123456789",
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
    nock("https://at-sce-api-qa.herokuapp.com/api").get("/v1/users").reply(200, users_response);
    nock("https://at-sce-api-qa.herokuapp.com/api").get("/v1/users").reply(400, users_response_error);
    nock("https://at-sce-api-qa.herokuapp.com/api").post("/v1/users").reply(200, users_response_add);
    //nock("https://at-sce-api-qa.herokuapp.com/api").get("/v1/histories?userid=604fc4def21087344f67ea38").reply(200, historyResponse);
    //nock("https://at-sce-api-qa.herokuapp.com/api").get("/v1/histories?userid=604fc4def21087344f67ea39").reply(200, historyResponse_EmptyArray);
    //nock("https://at-sce-api-qa.herokuapp.com/api").post("/v1/histories?userid=604fc4def21087344f67ea38").reply(201, historyResponse_add);
    //nock("https://at-sce-api-qa.herokuapp.com/api").post("/v1/histories?userid=604fc4def21087344f67ea38").reply(400, historyResponse_add_BadRequest);
  });

  // Operation: Get ALL USERS - GET/api/v1/users - BE Success (Happy Path)
  it("Should Get All Users - Call GET/api/v1/users - BE Success (Happy Path)", () => {
    return getAllUsers().then((users_response) => {
      console.debug("users_response", users_response);

      // Response Status
      expect(users_response).to.have.status(200);

      // Response
      expect(users_response.data.body).to.have.property("id");
    });
  });

  // Operation: Get ALL USERS - GET/api/v1/users - BE Error - 400 Bad Request
  it("Should Get All Users - Call GET/api/v1/users - BE Error - 400 Bad Request", () => {
    return getAllUsers_error().then((users_response_error) => {
      console.debug("users_response_error", users_response_error);

      // Response Status
      expect(users_response_error).equals(undefined);

      // Response
    });
  });

  /*it("Should Add User", () => {
    return createUser(data_add).then((response_add) => {
      //console.log(response_add);

      // Response Status
      expect(response_add.status).to.equal(200);

      // Response
      expect(response_add.data.body).to.have.property("id");
    });
  });

  it("Should Get All History", () => {
    return getHistory("604fc4def21087344f67ea38").then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.have.property("id");
    });
  });

  it("Should Get All History - Success 200 but Empty Array - User Not Exists", () => {
    return getHistory_error("604fc4def21087344f67ea39").then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.be.an("array");
    });
  });

  it("Should Create History", () => {
    return createHistory(historyData_add).then((response) => {
      // Response Status
      expect(response.status).to.equal(201);
      // Response
      expect(response.data.body).to.have.property("id");

      expect(response.data.body.id).to.equal("123456789");
    });
  });

  it("Should Get Create History- Bad Request 400 -Total", () => {
    return createHistory_error(historyData_add_BadRequest).then((response) => {
      // Response Status       
      expect(response.status).to.equal(400);
      // Response
      expect(response.data.body).to.have.property("error");      

      expect(response.data.body.error).to.equal("Bad Request");

    });
  });*/

});
