/**
 * AT SCE UI - AT SCE Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for at-sce-controller.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

//Models
const passport = require('passport');
const User = require('../services/at-sce-api.service');

// AT SCE Controller
const atSCEController = {};

// AT-SCE - Index/Login
atSCEController.renderSigninForm = async (req, res) => {
  console.log("--> atSCEController.renderSigninForm");

  // Render
  res.render("signin");
};

// AT-SCE - Signin 
atSCEController.signin = passport.authenticate("local", {
    successRedirect: "/calculator",
    failureRedirect: "/signin",
    failureFlash: true
});

// AT-SCE - Logout
atSCEController.signout = async (req, res) => {
  console.log("--> atSCEController.signout");

  // Redirect
  req.flash("success_msg", "User signout Successfully");
  res.redirect("/signin");
};

// AT-SCE - Calculator Form
atSCEController.calculator = async (req, res) => {
  console.log("--> atSCEController.calculator");
  res.render("calculator");
};

// AT-SCE - Add History
atSCEController.addHistory = async (req, res) => {
  console.log("--> atSCEController.addHistory");
  // Redirect
  req.flash("success_msg", "Calculation was saved successfully");
  res.redirect("/calculator");
};

module.exports = atSCEController;
