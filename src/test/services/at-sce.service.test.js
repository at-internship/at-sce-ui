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
const expect = require("chai").expect;
const nock = require("nock");


// MICROSERVICE - HEROKU - SCE
const atsceServiceAPI = require("../../services/at-sce-api.service");

// Operations
const getHistory = atsceServiceAPI.getHistory;
const getHistory_error = atsceServiceAPI.getHistory;
const createHistory = atsceServiceAPI.createHistory;
const createHistory_error = atsceServiceAPI.createHistory;

const data = {};

const historyResponse = {
  body: {
    "costDay": 320.8,
    "costHour": 35,
    "creationDate": "04-15-2021",
    "fixedExpenses": {
      "feed": 200.0,
      "internet": 1000.0,
      "others": 100.0,
      "rent": 7000.0,
      "total": 9300.0,
      "transport": 1000.0
    },
    "id": "6064f7c9691a1d135326a029",
    "projectCost": 20000.0,
    "revenue": 9766.0,
    "status": 1,
    "taxISR_r": 2000.0,
    "taxIVA": 3200.0,
    "taxIVA_r": 2134.0,
    "total": 7334.0,
    "totalDays": 100,
    "totalHours": 8,
    "type": 1,
    "user_id": "604fc4def21087344f67ea38"
  },
  status: 200,
};

const historyResponse_EmptyArray = {
  body:[]
};

const historyData_add = {
    "costDay": 320.8,
    "costHour": 35,
    "fixedExpenses": {
      "feed": 1200.99,
      "internet": 349,
      "others": 200.00,
      "rent": 6000.00,
      "total": 7829.99,
      "transport": 80.00
    },
    "projectCost": 5637.3,
    "revenue": 3588.3,
    "status": 1,
    "taxISR_r": 2328.9,
    "taxIVA": 600.00,
    "taxIVA_r": 599.99,
    "total": 10000.00,
    "totalDays": 14,
    "totalHours": 10,
    "type": 1,
    "id": "604fc4def21087344f67ea38"
  };
const historyResponse_add = {
    body: {
        id: "123456789"
    },
    status: 201
};
const historyData_add_BadRequest={
    "costDay": 320.8,
    "costHour": 35,
    "fixedExpenses": {
      "feed": 1200.99,
      "internet": 349.00,
      "others": 200.00,
      "rent": 6000.00,
      "total": 100.00,
      "transport": 80.00
    },
    "projectCost": 5637.3,
    "revenue": 3588.3,
    "status": 1,
    "taxISR_r": 2328.9,
    "taxIVA": 600.00,
    "taxIVA_r": 599.99,
    "total": 10000.00,
    "totalDays": 14,
    "totalHours": 10,
    "type": 1,
    "id": "604fc4def21087344f67ea38"
  };

  const historyResponse_add_BadRequest={
    body:{
        "timestamp": "2021-04-27T14:40:14.228+00:00",
        "status": 400,
        "error": "Bad Request",
        "message": "Invalid input on field Total. Correct format is: A number equal to the sum of all other fields in the Fixed Expenses section.",
        "path": "/api/v1/histories"
    },
    status:400
  };

describe("TEST: at-sce.service", () => {
  beforeEach(() => {
    nock("https://at-sce-api-qa.herokuapp.com/api").get("/v1/histories?userid=604fc4def21087344f67ea38").reply(200, historyResponse);
    nock("https://at-sce-api-qa.herokuapp.com/api").get("/v1/histories?userid=604fc4def21087344f67ea39").reply(200, historyResponse_EmptyArray);
    nock("https://at-sce-api-qa.herokuapp.com/api").post("/v1/histories?userid=604fc4def21087344f67ea38").reply(201, historyResponse_add);
    nock("https://at-sce-api-qa.herokuapp.com/api").post("/v1/histories?userid=604fc4def21087344f67ea38").reply(400, historyResponse_add_BadRequest);

  });

  it("Should Get All History", () => {
    return getHistory('604fc4def21087344f67ea38').then((response) => {
      // Response Status
      expect(response.status).to.equal(200);

      // Response
      expect(response.data.body).to.have.property("id");
    });
  });

  it("Should Get All History - Success 200 but Empty Array - User Not Exists",() => {
    return getHistory_error('604fc4def21087344f67ea39').then((response) => {
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

/*it("Should Get Create History- Bad Request 400 -Total", () => {
return createHistory_error(historyData_add_BadRequest).then((response) => {
    // Response Status       
    expect(response.status).to.equal(400);
    // Response
    expect(response.data.body).to.have.property("error");      

    expect(response.data.body.error).to.equal("Bad Request");

  });
});*/
    
});
