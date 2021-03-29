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
// MICROSERVICE - HEROKU - AT SCE API
const sceServiceAPI = require("../services/at-sce-api.service");

// Constants
const passport = require("passport");
const { useFakeXMLHttpRequest } = require("sinon");

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
  failureFlash: true,
});

// AT-SCE - Logout
atSCEController.signout = async (req, res) => {
  console.log("--> atSCEController.signout");
  req.logout();

  // Redirect
  req.flash("success_msg", "User signout Successfully");
  res.redirect("/signin");
};

// AT-SCE - Calculator Form
atSCEController.calculator = async (req, res) => {
  console.log("--> atSCEController.calculator");
  let history = [];

  try{
    const user = req.user.data.id;
    //console.log(user);
    const responseHistory = await sceServiceAPI.getHistory(user);
    //console.log(responseHistory);
    if (responseHistory === null || responseHistory === undefined) {
      console.error("Service unavailable: sceServiceAPI.getHistory()");
      req.flash("error_msg", "Service unavailable");
    } else {
      
      history = responseHistory.data
    }
  } catch(error){
    console.error(error.message);
  }finally {
    res.render("calculator", { history });
  }
};

// AT-SCE - Add History
atSCEController.addHistory = async (req, res) => {
  console.log("--> atSCEController.addHistory");
  // Redirect
  req.flash("success_msg", "Calculation was saved successfully");
  res.redirect("/calculator");
};

module.exports = atSCEController;
