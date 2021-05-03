/**
 * AT SCE UI - AT SCE Service API Test.
 * Copyright 2021 AgileThought, Inc.
 *
 * Integration Test for at-sce-api endpoint.
 *
 * @author @at-internship
 * @version 1.0
 *
 */
 // Constants
 const chai = require('chai');
 const chaiHttp = require('chai-http');
 const expect = require('chai').expect;
 chai.use(chaiHttp);

// MICROSERVICE - HEROKU - SCE
const AT_SCE_SERVICE_URI = process.env.AT_SCE_SERVICE_URI;

// MICROSERVICE - HEROKU - SS0
const AT_SSO_SERVICE_URI = process.env.AT_SS0_SERVICE_URI;

// AT_SSO_SERVICE_URI_ENABLED FLAG
const AT_SSO_SERVICE_URI_ENABLED = process.env.AT_SSO_SERVICE_URI_ENABLED;
const AT_SERVICE_URI = (AT_SSO_SERVICE_URI_ENABLED == 'true') ? AT_SSO_SERVICE_URI : AT_SCE_SERVICE_URI;
console.log(`at-sce.service.integration.test - AT_SERVICE_URI: ${AT_SERVICE_URI}`);

 // AT SCE Service API
const SCE_SERVICE_API = AT_SERVICE_URI + '/v1/users';
const SCE_SERVICE_API_400 = AT_SERVICE_URI + '/v1/usuarios';

describe('INTEGRATION TEST: at-sce-service.js', () => {

    // Operation: Get ALL USERS - GET/api/v1/users - BE Success (Happy Path)
    it('INTEGRATION TEST: Should Get All Users - Call GET/api/v1/users - BE Success (Happy Path)', (done) => {
        chai.request(SCE_SERVICE_API)
            .get('/')
            .end(function (err, res) {
                //console.debug(res.body);

                // Response Status
                expect(res).to.have.status(200);
                done();
            });
    });

    // Operation: Get ALL USERS - GET/api/v1/users - BE Error - 400 Bad Request
    it('INTEGRATION TEST: Should Fail Get All Users - Call GET/api/v1/users - BE Error - 400 Bad Request', (done) => {
        chai.request(SCE_SERVICE_API_400)
            .get('/')
            .end(function(err, res) {
                //console.debug(res.body)

                // Response Status
                expect(res).to.have.status(404);

                // Response message
                expect(res).to.have.property('body');
                
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('status').equals(404);
                
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('error').equals('Not Found');
                
                expect(res.body).to.have.property('message');
                expect(res.body).to.have.property('message').equals('No message available');

                expect(res.body).to.have.property('path');
                expect(res.body).to.have.property('path').equals('/api/v1/usuarios/');

                done();
            });
    });
});
