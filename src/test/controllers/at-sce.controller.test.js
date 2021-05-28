/**
 * AT SCE UI - AT-SCE Controller Test.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for at-sce-controller.test.js
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// Constants
const sinon = require("sinon");
const expect = require("chai").expect;

// AT SCE Controller
const AT_SCE_CONTROLLER = require("../../controllers/at-sce.controller");

// AT SCE API Service
const AT_SCE_API_SERVICE = require("../../services/at-sce-api.service");

describe("TEST: at-sce.controller.test.js", function() {
    let getallhistoriesstub;
    let addhistorystub;

    beforeEach(function(){
        getallhistoriesstub = sinon.stub(AT_SCE_API_SERVICE, "getHistory");
        addhistorystub = sinon.stub(AT_SCE_API_SERVICE, "createHistory");
    });
    afterEach(function(){
        getallhistoriesstub.restore();
        addhistorystub.restore();
    });

    // AT-SCE - Index/Login - Success
    it("Should render Index/Login section - Success", function(done) {
        var req = { flash: sinon.spy() };
        var res = { render: sinon.spy() };

        var view = AT_SCE_CONTROLLER.renderSigninForm(req, res).then(function() {
            expect(res.render.calledOnce).to.be.true;
            done();
        });
    });

    //AT-SCE - Signin
    it("Should signin - success", function(){
        var passport = require('passport');
        passport.initialize = function () {
            return function (req, res, next) {
                passport = this;
                passport._key = 'passport';
                passport._userProperty = 'user';
                passport.serializeUser = function(user, done) {
                    return done(null, user.id);
                };
                passport.deserializeUser = function(user, done) {
                    return done(null, user);
                };
                req._passport = {
                    instance: passport
                };
                req._passport.session = {
                    user: new app.models.User({ id: '604fc4def21087344f67ea38', name: 'Admin' })
                };
    
                return next();
            };
        };
    });

    it("Should signin - failure", function(){
        var passport = require('passport');
        passport.initialize = function () {
            return function (req, res, next) {
                passport = this;
                passport._key = 'passport';
                passport._userProperty = 'user';
                passport.serializeUser = function(user, done) {
                    return done(null, null);
                };
                passport.deserializeUser = function(user, done) {
                    return done(null, null);
                };
                req._passport = {
                    instance: passport
                };
                req._passport.session = {
                    user: new app.models.User({ id: '', name: '' })
                };
    
                return next();
            };
        };
    });

    //AT-SCE - Logout - Success
    it("Should logout - Success", function(){
        var req = { flash: sinon.spy() };
        var res = { render: sinon.spy() };

        var view = AT_SCE_CONTROLLER.signout(req, res).then(function(){
            expect(res.render.calledOnce).to.be.true;
        });
    });

    // AT-SCE - Calculator Form - Get History table
    it("Should render history table - success", function(done){
        var req = { 
            user: {
                data: {
                    id: '604fc4def21087344f67ea38'
                }  
            },
            flash: sinon.spy() 
        };
        var res = { render: sinon.spy() };

        var histories = [];
        getallhistoriesstub.returns(Promise.resolve(histories));

        var view = AT_SCE_CONTROLLER.calculator(req, res).then(function(){
            expect(res.render.calledOnce).to.be.true;
            done();
        });
    });

    it("Should render history table - error", function(done){
        var req = { flash: sinon.spy() };
        var res = { render: sinon.spy() };

        var histories = [];
        getallhistoriesstub.returns(Promise.resolve(histories));

        var view = AT_SCE_CONTROLLER.calculator(req, res).then(function(){
            expect(res.render.calledOnce).to.be.true;
            done();
        });
    });

    // AT-SCE - Add History - Save history
    it("Should add history operation - true", function(done){
        this.timeout(5000);
        var req = { 
            user: {
                data: {
                    id: '604fc4def21087344f67ea38',
                    status: '1'
                }  
            },
            flash: sinon.spy() 
        };
        var res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };

        var histories = [];
        addhistorystub.returns(Promise.resolve(histories));

        var view = AT_SCE_CONTROLLER.addHistory(req, res).then(function(){
            expect(res.render.calledOnce).to.be.false;
            done();
        }).catch(done);
    });

    it("Should add history operation - false", function(done) {
        this.timeout(5000);
        var req = { 
            user: {
                data: {
                    id: '604fc4def21087344f67ea38',
                    status: '1'
                }  
            },
            flash: sinon.spy() 
        };
        var res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };

        var histories = [];
        addhistorystub.returns(Promise.resolve(histories));
        
        var view = AT_SCE_CONTROLLER.addHistory(req, res).then(function() {
            expect(res.render.calledOnce).to.be.false;
            done();
        }).catch(done);
    });

    it("Should add history operation - error", function(done) {
        this.timeout(5000);
        var res = {
            render: sinon.spy(),
            redirect: sinon.spy()
        };
        var req = {
            user: {
                data: {
                    id: '604fc4def21087344f67ea38',
                    status: '1'
                }  
            },
            body: {
                rent: null,
                transport: null,
                telephone: null,
                feeding: null,
                others: null,
                hours: null,
                days: null,
                projectType: null,
                projectCost: null,
                total: null,
                costDay: null,
                costHour: null,
                taxIva: null,
                taxIsr_r: null,
                taxIva_r: null,
                finalProjectCost: null,
                totalRevenue: null,
            },
            flash: sinon.spy()
        };
        var err = { response: sinon.spy() };

        var histories = [];
        addhistorystub.returns(Promise.resolve(err));

        var view = AT_SCE_CONTROLLER.addHistory(req, res).then(function() {
            expect(res.redirect.calledOnce).to.be.true;
            done();
        }).catch(done);
    });
});