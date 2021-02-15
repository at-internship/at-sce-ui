/**
 * AT SCE UI - AT SCE Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for at-sce-controller.
 *
 * @author @at-internship
 * @version 1.0
 */

// AT SCE Controller
const atSCEController = {};

// AT-SCE - Index/Login
atSCEController.renderSigninForm = async (req, res) => {
  console.log("--> atSCEController.renderSigninForm");

  // Render
  res.render("signin");
};

atSCEController.signin = async (req, res) => {
  console.log("--> atSCEController.signin");

  // Redirect
  req.flash("success_msg", "User signin Successfully");
  res.redirect("/calculator");
};

// AT-SCE - Logout
atSCEController.signout = async (req, res) => {
  console.log("--> atSCEController.signout");

  // Redirect
  req.flash("success_msg", "User signout Successfully");
  res.redirect("/signin");
};

// AT-SCE - Calculator
atSCEController.calculator = async (req, res) => {
  console.log("--> atSCEController.calculator");
  res.render("calculator");
};

module.exports = atSCEController;
