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

// Constanst
const sinon = require("sinon");
const expect = require("chai").expect;

// Admin Controller
const adminController = require("../../controllers/admin.controller");

describe("Admin Test Controller", function() {

    // AT-SCE - Admin - Users - Add User - Success (Happy Path)
    it("Should Add User on admin section - FE Success", function() {
    });

    // AT-SCE - Admin - Users - Add User - FE Error - Validations
    it("Should Add User on admin section - FE Error - Validations", function() {
    });

    // AT-SCE - Admin - Users - Add User - FE Error - Call Create USER - POST /api/v1/users endpoint
    it("Should Add User on admin section - FE Error - Call Create USER - Service unavailable", function() {
    });

    // AT-SCE - Admin - Users - Add User - BE Error - Bad Request - Type
    it("Should Add User on admin section - BE Error - Bad Request - Type", function() {
    });

    // AT-SCE - Admin - Users - Add User - BE Error - Bad Request - First Name
    it("Should Add User on admin section - BE Error - Bad Request - First Name", function() {
    });

});
