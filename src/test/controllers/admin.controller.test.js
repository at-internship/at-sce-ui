/**
 * AT SCE UI - Admin Test Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for admin-controller-test.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// Constants
const sinon = require("sinon");
const expect = require("chai").expect;

// Admin Controller
const adminController = require("../../controllers/admin.controller");

describe("TEST: admin.controller.js", function() {

    // AT-SCE - Admin - Users - Add User - FE Success (Happy Path)
    it("Should Add User on admin section - FE Success", function() {
    });

    // AT-SCE - Admin - Users - Add User - FE Error - Validations
    it("Should Add User on admin section - FE Error - Validations", function() {
    });

    // AT-SCE - Admin - Users - Add User - FE Error - 500 Service unavailable
    it("Should Add User on admin section - FE Error - Call Create USER - 500 Service unavailable", function() {
    });

    // AT-SCE - Admin - Users - Add User - BE Error - 400 Bad Request - Type
    it("Should Add User on admin section - BE Error - Call Create USER - 400 Bad Request - Type", function() {
    });

    // AT-SCE - Admin - Users - Add User - BE Error - 400 Bad Request - First Name
    it("Should Add User on admin section - BE Error - Call Create USER - 400 Bad Request - First Name", function() {
    });

});
