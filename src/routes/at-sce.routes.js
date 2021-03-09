/**
 * AT SCE UI - AT SCE Routes.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for at-sce-routes.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

const express = require("express");
const router = express.Router();
const path = require("path");

// SCE Controller
const {
  renderSigninForm,
  signin,
  signout,
  calculator,
  addHistory,
} = require("../controllers/at-sce.controller");

// ============= Sub Routes =============

// AT-SCE - Index
router.get("/", renderSigninForm);

// AT-SCE - Login
router.get("/signin", renderSigninForm);
router.post("/signin", signin);

// AT-SCE - Logout
router.get("/signout", signout);

// AT-SCE - Calculator
router.get("/calculator", calculator);

// AT-SCE - Add History
router.post("/history/add", addHistory);

module.exports = router;
