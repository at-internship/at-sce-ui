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
  console.log("--> user id:" + user_id);
  console.log("---> Req Body: " + JSON.stringify(req.body));
  /*let costPerHour = document.getElementById("costPerHour").value;
    let costPerDay = document.getElementById("costPerDay").value;
    let projectWillCostYou = document.getElementById("projectWillCostYou").value;
    let taxesIVAandISR = document.getElementById("taxesIVAandISR").value;*/
  try {
    const {
      rent,
      transport,
      telephone,
      feeding,
      others,
      hours,
      days,
      projectCost,
      costPerHour,
      costPerDay,
      projectWillCostYou,
      taxesIVAandISR,
      revenue,
    } = req.body;
    const userErrors = [];

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
    /*if (!projectWillCostYou) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!taxesIVAandISR) {
      userErrors.push({ text: "Empty Field. " });
    }
    if (!revenue) {
      userErrors.push({ text: "Empty Field. " });
    }*/

    if (userErrors.length > 0) {
      res.render("calculator", {
        rent,
        transport,
        telephone,
        feeding,
        others,
        costPerHour,
        costPerDay,
        projectCost,
      });
    }
    //console.log((days,calculateTotalFixedCost(rent, transport, telephone, feeding, others)));
    // Request
    let request = {
      user_id: user_id,

      fixedExpenses: {
        rent: rent,
        transport: transport,
        internet: telephone,
        feeding: feeding,
        others: others,
        total: rent + transport + telephone + feeding + others,
      },

      totalHours: hours * days,
      totalDays: days,
      costPerDay: (rent + transport + telephone + feeding + others) / days,
      costPerHour:
        (rent + transport + telephone + feeding + others) / days / hours,
      projectcost: projectCost,
      taxIVA: projectCost * 0.16,
      taxISR_r: projectCost * 0.1,
      taxIVA_r: projectCost * 0.1067,
      total: projectCost * 0.16 + projectCost * 0.1 + projectCost * 0.1067,
      revenue:
        projectCost * 0.16 -
        projectCost * 0.1 -
        projectCost * 0.1067 -
        (rent + transport + telephone + feeding + others),
    };
    console.debug("Request-->", request);

    // Call Create History - POST /api/v1/histories?userid={id}
    await sceServiceAPI.createHistory(request).then((result) => {
      if (!result) {
        console.error("Service unavailable: sceServiceAPI.createHistory()");
        req.flash("error_msg", "Service unavailable");
      }
      console.debug("Result-->", JSON.stringify(result.body));
    });
    // Redirect
    req.flash("success_msg", "Calculation was saved successfully");
    return res.redirect("/calculator");
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
  }
};

module.exports = atSCEController;
