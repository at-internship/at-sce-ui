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
  res.render("signin", { layout: 'login-layout.hbs' });
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
  let histories = [];

  try {
    const user = req.user.data.id;
    //console.debug("User-->", user);
    const responseHistory = await sceServiceAPI.getHistory(user);
    //console.debug("Response-->", responseHistory);

    if (responseHistory === null || responseHistory === undefined) {
      console.error("Service unavailable: sceServiceAPI.getHistory()");
      req.flash("error_msg", "Service unavailable");
    } else {
      histories = responseHistory.data;
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    res.render("calculator", { histories });
  }
};

// AT-SCE - Add History
atSCEController.addHistory = async (req, res) => {
  console.log("--> atSCEController.addHistory");
  const user_id = req.user.data.id;
  const status = req.user.data.status;
  console.debug("--> user id:" + user_id);

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
      finalProjectCost,
      totalRevenue,
    } = req.body;
    const userErrors = [];
    console.debug(req.body);

    // Validations
    if (!rent) {
      userErrors.push({ text: "Please Enter rent value." });
    }
    if (!transport) {
      userErrors.push({ text: "Please Enter transport value." });
    }
    if (!telephone) {
      userErrors.push({ text: "Please Enter Telephone/Internet value. " });
    }
    if (!feeding) {
      userErrors.push({ text: "Please Enter feeding value. " });
    }
    if (!others) {
      userErrors.push({ text: "Please Enter others value. " });
    }
    if (!hours) {
      userErrors.push({ text: "Please Enter hours a day will you dedicate. " });
    }
    if (!days) {
      userErrors.push({ text: "Please Enter days will it take to finish it. " });
    }
    if (!projectCost) {
      userErrors.push({ text: "Please Enter Project Cost value . " });
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
        finalProjectCost,
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
        total: parseFloat(total).toFixed(2),
      },
      totalHours: hours,
      totalDays: days,
      costDay: parseFloat(costDay).toFixed(2),
      costHour: parseFloat(costHour).toFixed(2),
      projectCost: parseFloat(projectCost).toFixed(2),
      taxIVA: parseFloat(taxIva).toFixed(2),
      taxISR_r: parseFloat(taxIsr_r).toFixed(2),
      taxIVA_r: parseFloat(taxIva_r).toFixed(2),
      total: parseFloat(finalProjectCost).toFixed(2),
      revenue: parseFloat(totalRevenue).toFixed(2),
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
