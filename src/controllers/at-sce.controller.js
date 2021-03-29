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
// Constants
const passport = require("passport");

// AT SCE Controller
const atSCEController = {};

// MICROSERVICE - HEROKU - AT SCE API
const sceServiceAPI = require("../services/at-sce-api.service");

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
  res.render("calculator");
};

// AT-SCE - Add History
atSCEController.addHistory = async (req, res) => {
  console.log("--> atSCEController.addHistory");

  const user_id = req.user.data.id;
  const status = req.user.data.status;
  console.log("--> user id:" + user_id);

  try {
    const {
      rent,
      transport,
      telephone,
      feeding,
      others,
      hours,
      days,
      projectType,
      projectCost,
      total,
      costDay,
      costHour,
      taxIva,
      taxIsr_r,
      taxIva_r,
      totalTaxes,
      totalRevenue,
    } = req.body;
    const userErrors = [];
    console.log(req.body);

    // Validations
    if (!rent) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!transport) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!telephone) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!feeding) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!others) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!hours) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!days) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!projectCost) {
      userErrors.push({ text: "Empty Field. " });
    }

    if (userErrors.length > 0) {
      res.render("calculator", {
        rent,
        transport,
        telephone,
        feeding,
        others,
        hours,
        days,
        projectCost,
        total,
        costDay,
        costHour,
        taxIva,
        taxIsr_r,
        taxIva_r,
        totalTaxes,
        totalRevenue,
      });
    }
    // Request
    let request = {
      type: projectType,
      user_id: user_id,
      fixedExpenses: {
        rent: parseFloat(rent).toFixed(2),
        transport: parseFloat(transport).toFixed(2),
        internet: parseFloat(telephone).toFixed(2),
        feed: parseFloat(feeding).toFixed(2),
        others: parseFloat(others).toFixed(2),
        total: total,
      },

      totalHours: hours,
      totalDays: days,
      costDay: costDay,
      costHour: costHour,
      projectCost: projectCost,
      taxIVA: taxIva,
      taxISR_r: taxIsr_r,
      taxIVA_r: taxIva_r,
      total: totalTaxes,
      revenue: totalRevenue,
      status: status,
    };
    console.debug("Request-->", request);

    // Call Create History - POST /api/v1/histories?userid={id}
    await sceServiceAPI.createHistory(request).then((result) => {
      if (!result) {
        console.log("error");
        console.error("Service unavailable: sceServiceAPI.createHistory()");
        req.flash("error_msg", "Service unavailable");
      } else {
        req.flash("success_msg", "Calculation was saved successfully");
      }
      console.debug("Result-->", result);
    });
    // Redirect
    res.redirect("/calculator");
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
  }
};

module.exports = atSCEController;
