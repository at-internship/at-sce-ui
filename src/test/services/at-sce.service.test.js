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
const getHistory = AT_SCE_SERVICE_API.getHistory;
const getHistory_error = AT_SCE_SERVICE_API.getHistory;

const createHistory = AT_SCE_SERVICE_API.createHistory;
const createHistory_error = AT_SCE_SERVICE_API.createHistory;

// Mock Responses
const data = {};

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
    user_id: "60affe6c498aa02e209bdff2",
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
  id: "60affe6c498aa02e209bdff2",
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
  id: "60affe6c498aa02e209bdff2",
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
    nock(AT_SCE_SERVICE_URI).defaultReplyHeaders({'Authorization': 'Bearer 5c36a150-dfc1-89d2-341b-bea6e5523444'}).get("/v1/histories?userid=60affe6c498aa02e209bdff2").reply(200, historyResponse);
    nock(AT_SCE_SERVICE_URI).defaultReplyHeaders({'Authorization': 'Bearer 5c36a150-dfc1-89d2-341b-bea6e5523444'}).get("/v1/histories?userid=60affe6c498aa02e209bdff2").reply(200, historyResponse_EmptyArray);
    
    nock(AT_SCE_SERVICE_URI).defaultReplyHeaders({'Authorization': 'Bearer 5c36a150-dfc1-89d2-341b-bea6e5523444'}).post("/v1/histories?userid=60affe6c498aa02e209bdff2").reply(201, historyResponse_add);
    nock(AT_SCE_SERVICE_URI).defaultReplyHeaders({'Authorization': 'Bearer 5c36a150-dfc1-89d2-341b-bea6e5523444'}).post("/v1/histories?userid=60affe6c498aa02e209bdff2").reply(400, historyResponse_add_BadRequest);
  });

  it("Should Get All History - Call GET /api/v1/histories?userid={id} - BE Success (Happy Path)", () => {
    return getHistory("60affe6c498aa02e209bdff2").then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.have.property("id");
      expect(response.data.body).to.have.property("id").equals("6064f7c9691a1d135326a029");
      expect(response).to.have.header('content-type', 'application/json');
      expect(response).to.have.header('Authorization', 'Bearer 5c36a150-dfc1-89d2-341b-bea6e5523444');
    });
  });

  it("Should Get All History - Call GET /api/v1/histories?userid={id} - BE Success (Happy Path)-Empty Array", () => {
    return getHistory_error("60affe6c498aa02e209bdff2").then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.be.an("array").that.is.empty;
      expect(response).to.have.header('content-type', 'application/json');
      expect(response).to.have.header('Authorization', 'Bearer 5c36a150-dfc1-89d2-341b-bea6e5523444');
    });
  });

  it("Should Create History - Call POST /api/v1/histories?userid={id} - BE Success (Happy Path)", () => {
    return createHistory(historyData_add).then((response) => {
      // Response Status
      expect(response.status).to.equal(201);

      // Response
      expect(response.data.body).to.have.property("id");
      expect(response.data.body.id).to.equal("12345678910");
      expect(response).to.have.header('content-type', 'application/json');
      expect(response).to.have.header('Authorization', 'Bearer 5c36a150-dfc1-89d2-341b-bea6e5523444');
    });
  });

  it("Should Create History - Call POST /api/v1/histories?userid={id} - BE Error - 400 Bad Request", () => {
    return createHistory_error(historyData_add_BadRequest).then((response) => {

    }).catch((error)=>{
        expect(error.response.status).to.equal(400);
        expect(error.response.data.body.error).to.equal("Bad Request");
    });
  });

});
