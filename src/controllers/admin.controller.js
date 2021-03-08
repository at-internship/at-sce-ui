/**
 * AT SCE UI - AT Admin Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for at-admin-controller.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// AT Admin Controller
const adminCtrl = {};

// MICROSERVICE - HEROKU - SCE API
//const sceServiceAPI = require("../services/at-sce-api.service");

// AT-SCE - Admin - Index
adminCtrl.renderIndex = async (req, res) => {
  console.log("--> adminCtrl.renderIndex");
  res.render("admin/index");
};

// AT-SCE - Admin - Users - Render User List
adminCtrl.renderUserList = async (req, res) => {
  console.log("--> adminCtrl.renderUserList");

  let users = [];
  res.render("admin/user/index", { users });
};

// AT-SCE - Admin - Users - Render Add User Form
adminCtrl.renderAddUserForm = async (req, res) => {
  console.log("--> adminCtrl.renderAddUserForm");
  res.render("admin/user/add-user");
};

// AT-SCE - Admin - Users - Add User
adminCtrl.addUser = async (req, res) => {
  console.log("--> adminCtrl.addUser");
  // Redirect
  req.flash("success_msg", "User Added Successfully");
  res.redirect("/admin/user");
};

// AT-SCE - Admin - Users - Render Edit User Form
adminCtrl.renderEditUserForm = async (req, res) => {
  console.log("--> adminCtrl.renderEditUserForm");
  res.render("admin/user/edit-user");
};

// AT-SCE - Admin - Users - Edit User
adminCtrl.updateUser = async (req, res) => {
  console.log("--> adminCtrl.updateUser");
  const user_id = req.params.id;
  console.log("--> user id:" + user_id);

  // Redirect
  req.flash("success_msg", "User Updated Successfully");
  res.redirect("/admin/user");
};

// AT-SCE - Admin - Users - Delete User
adminCtrl.deleteUser = async (req, res) => {
  console.log("--> adminCtrl.deleteUser");
  // Redirect
  req.flash("success_msg", "User Deleted Successfully");
  res.redirect("/admin/user");
};

module.exports = adminCtrl;
