/**
 * AT SCE UI - AT Admin Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for admin.controller.js
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// AT SCE Admin Controller
const ADMIN_CONTROLLER = {};

// CREATE_USER_ENCRYPTION_ENABLED FLAG
const CREATE_USER_ENCRYPTION_ENABLED = process.env.CREATE_USER_ENCRYPTION_ENABLED;

// UPDATE_USER_ENCRYPTION_ENABLED FLAG
const UPDATE_USER_ENCRYPTION_ENABLED = process.env.UPDATE_USER_ENCRYPTION_ENABLED;

// AT SCE API Servcie
const AT_SCE_API_SERVICE = require("../services/at-sce-api.service");

// AT SCE Auth Helper
const { encrypt } = require("../helpers/auth.helper");

// AT-SCE - Admin - Index
ADMIN_CONTROLLER.renderIndex = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderIndex");
  res.render("admin/index");
};

// AT-SCE - Admin - Users - Render User List
ADMIN_CONTROLLER.renderUserList = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderUserList");
  let users = [];

  try {
    const responseUserList = await AT_SCE_API_SERVICE.getAllUsers();
    if (responseUserList === null || responseUserList === undefined) {
      console.error("Service unavailable: AT_SCE_API_SERVICE.getAllUsers()");
      req.flash("error_msg", "Service unavailable");
    } else {
      users = responseUserList.data;
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    res.render("admin/user/index", { users });
  }
};

// AT-SCE - Admin - Users - Render Add User Form
ADMIN_CONTROLLER.renderAddUserForm = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderAddUserForm");
  res.render("admin/user/add-user");
};

// AT-SCE - Admin - Users - Add User
ADMIN_CONTROLLER.addUser = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.addUser");

  try {
    const {
      user_type,
      user_firstName,
      user_lastName,
      user_email,
      user_password,
      user_status,
    } = req.body;
    const userErrors = [];

    // Validations
    if (!user_type) {
      userErrors.push({ text: "Please Enter a Type." });
    }
    if (!user_firstName) {
      userErrors.push({ text: "Please Type a First Name." });
    }
    if (!user_lastName) {
      userErrors.push({ text: "Please Type a Last Name." });
    }
    if (!user_email) {
      userErrors.push({ text: "Please Type an Email." });
    }
    if (!user_password) {
      userErrors.push({ text: "Please Type a Password." });
    }
    if (!user_status) {
      userErrors.push({ text: "Please Enter a Status." });
    }

    if (userErrors.length > 0) {
      console.debug("--> ADMIN_CONTROLLER.addUser - Validations error");
      res.render("admin/user/add-user", {
        userErrors,
        user_firstName,
        user_lastName,
        user_password,
        user_email,
        user_status,
      });
    }

    // Request
    let request = {
      type: parseInt(user_type),
      firstName: user_firstName,
      lastName: user_lastName,
      email: user_email,
      password: (CREATE_USER_ENCRYPTION_ENABLED == 'true') ? (await encrypt(user_password)).content : user_password,
      status: parseInt(user_status),
    };
    console.debug("admin.controller.js - addUser - request-->", request);

    // Call Create USER - POST /api/v1/users endpoint
    await AT_SCE_API_SERVICE.createUser(request).then((result) => {
      if (!result) {
        console.error("Service unavailable: AT_SCE_API_SERVICE.createUser()");
        req.flash("error_msg", "Service unavailable");
        res.redirect("/admin/user");
      }
      console.debug("admin.controller.js - addUser - Result-->", result);
    });

    // Redirect
    req.flash("success_msg","User created successfully");
    res.redirect("/admin/user");
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
    res.redirect("/admin/user");
  }
};

// AT-SCE - Admin - Users - Render Edit User Form
ADMIN_CONTROLLER.renderEditUserForm = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.renderEditUserForm", req.params.id);
  let user = [];

  try {
    const responseUserbyId = await AT_SCE_API_SERVICE.getUserById(req.params.id);
    if (!responseUserbyId) {
      console.error("Service unavailable: AT_SCE_API_SERVICE.getUserById()");
      req.flash("error_msg", "Service unavaible");
    } else {
      user = responseUserbyId.data;
      console.debug("admin.controller.js - renderEditUserForm -", JSON.stringify(responseUserbyId.data));
    }
  } catch (err) {
    console.err("admin.controller.js - renderEditUserForm -", err.message);
  } finally {
    res.render("admin/user/edit-user", { user });
  }
};

// AT-SCE - Admin - Users - Edit User
ADMIN_CONTROLLER.updateUser = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.updateUser");

  const user_id = req.params.id;
  console.debug("admin.controller.js - updateUser - user id-->" + user_id);

  if (!user_id) {
    req.flash("error_msg", "User Not Authorized");
    return res.redirect("/admin/user");
  }

  try {
    const {
      user_type,
      user_firstName,
      user_lastName,
      user_email,
      user_password,
      user_status,
    } = req.body;
    const userErrors = [];

    // Validations
    if (!user_type) {
      userErrors.push({ text: "Please type a Type." });
    }
    if (!user_firstName) {
      userErrors.push({ text: "Please type a FirstName." });
    }
    if (!user_lastName) {
      userErrors.push({ text: "Please type a LastName." });
    }
    if (!user_email) {
      userErrors.push({ text: "Please type a Email." });
    }
    if (!user_status) {
      userErrors.push({ text: "Please type a Status." });
    }

    if (userErrors.length > 0) {
      console.debug("--> ADMIN_CONTROLLER.updateUser - Validations error");
      res.render("admin/user/edit-user", {
        userErrors,
        user_id,
        user_type,
        user_firstName,
        user_lastName,
        user_email,
        user_status,
      });
    }

    // Request
    let request = {
      id: user_id,
      type: parseInt(user_type),
      firstName: user_firstName,
      lastName: user_lastName,
      email: user_email,
      password: (UPDATE_USER_ENCRYPTION_ENABLED == 'true') ? (await encrypt(user_password)).content : user_password,
      status: parseInt(user_status),
    };
    console.debug("admin.controller.js - updateUser - Request-->", request);

    // Call Update USER - PUT /api/v1/users endpoint
    await AT_SCE_API_SERVICE.updateUser(request).then((result) => {
      if (!result) {
        console.error("Service unavailable: AT_SCE_API_SERVICE.updateUser()");
        req.flash("error_msg", "Service unavailable");
        res.redirect("/admin/user");
      }
      console.debug("Result-->", result);
    });

    // Redirect
    req.flash("success_msg", "User Updated Successfully");
    res.redirect("/admin/user");
  } catch (err) {
    console.log(err.response);
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
    res.redirect("/admin/user");
  }
};

// AT-SCE - Admin - Users - Delete User
ADMIN_CONTROLLER.deleteUser = async (req, res) => {
  console.log("--> ADMIN_CONTROLLER.deleteUser");

  const user_id = req.params.id;
  console.debug("admin.controller.js - deleteUser - user_id-->", user_id);

  try {
    const response = await AT_SCE_API_SERVICE.deleteUser(user_id);
    if (!response) {
      console.error("Service unavailable: AT_SCE_API_SERVICE.deleteUser()");
      req.flash("error_msg", "Service unavailable");
      es.redirect("/admin/user");
    }
  } catch (err) {
    if (err.response && err.response.data) {
      let errorMsg = err.response.data.message;
      req.flash("error_msg", errorMsg);
    }
    res.redirect("/admin/user");
  } finally {
    // Redirect
    req.flash("success_msg", "User Deleted Successfully");
    res.redirect("/admin/user");
  }
};

module.exports = ADMIN_CONTROLLER;
