/**
 * AT SCE UI - AT SCE Test Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for at-sce-controller-test.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// Constanst
const sinon = require("sinon");
const expect = require("chai").expect;

// AT SCE Controller
const atSceController = require("../../controllers/at-sce.controller");

describe("at-sce Test Controller", function() {

    // AT-SCE - Index/Login - Success
    it("Should render Index/Login section - Success", function(done) {
        var req = { flash: sinon.spy() };
        var res = { render: sinon.spy() };

        var view = atSceController.renderSigninForm(req, res).then(function() {
            expect(res.render.calledOnce).to.be.true;
            done();
        });
    });
});
