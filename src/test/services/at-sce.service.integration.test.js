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

 // AT SCE Service API
const sceServiceAPI = 'https://at-sce-api.herokuapp.com/api' + '/v1/users';
const sceServiceAPI_400 = 'https://at-sce-api.herokuapp.com/api' + '/v1/usuarios';

describe('INTEGRATION TEST: at-sce-service.js', () => {

    // Operation: Get ALL USERS - GET/api/v1/users - BE Success (Happy Path)
    it('Should Get All Users - Call GET/api/v1/users - BE Success (Happy Path)', (done) => {
        chai.request(sceServiceAPI)
            .get('/')
            .end(function (err, res) {
                //console.debug(res.body);

                // Response Status
                expect(res).to.have.status(200);
                done();
            });
    });

    // Operation: Get ALL USERS - GET/api/v1/users - BE Error - 400 Bad Request
    it('Should Fail Get All Users - Call GET/api/v1/users - BE Error - 400 Bad Request', (done) => {
        chai.request(sceServiceAPI_400)
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