/**
 * AT SCE UI - AT Admin Routes.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for admin-routes.
 *
 * @author @at-internship
 * @version 1.0
 *
 */
// Constants
const express = require("express");
const router = express.Router();
const path = require("path");

// Helpers
const { isAuthenticated, isAdmin } = require("../helpers/auth.helper");

// Admin Controller
const {
  renderIndex,
  renderUserList,
  renderAddUserForm,
  addUser,
  renderEditUserForm,
  updateUser,
  deleteUser,
} = require("../controllers/admin.controller");

// AT-SCE - Admin - Index
router.get("/", isAdmin, renderIndex);

// AT-SCE - Admin - Users - Render User List
router.get("/user", isAdmin, renderUserList);

// AT-SCE - Admin - Users - Render Add User Form
router.get("/user/add", isAdmin, renderAddUserForm);
// AT-SCE - Admin - Users - Add User
router.post("/user/add", isAdmin, addUser);

// AT-SCE - Admin - Users - Render Edit User Form
router.get("/user/edit/:id", isAdmin, renderEditUserForm);
// AT-SCE - Admin - Users - Edit User
router.put("/user/edit/:id", isAdmin, updateUser);

// AT-SCE - Admin - Users - Delete User
router.get("/user/delete/:id", isAdmin, deleteUser);

module.exports = router;
