/**
 * AT SCE UI - AT Admin Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for admin-controller.
 *
 * @author @at-internship
 * @version 1.0
 *
 */

// AT Admin Controller
const adminCtrl = {};

// CREATE_USER_ENCRYPTION_ENABLED FLAG
const CREATE_USER_ENCRYPTION_ENABLED = process.env.CREATE_USER_ENCRYPTION_ENABLED;

// UPDATE_USER_ENCRYPTION_ENABLED FLAG
const UPDATE_USER_ENCRYPTION_ENABLED = process.env.UPDATE_USER_ENCRYPTION_ENABLED;

// MICROSERVICE - HEROKU - AT SCE API
const sceServiceAPI = require("../services/at-sce-api.service");

// Helpers
const { encrypt } = require("../helpers/auth.helper");

// AT-SCE - Admin - Index
adminCtrl.renderIndex = async (req, res) => {
  console.log("--> adminCtrl.renderIndex");
  res.render("admin/index");
};

// AT-SCE - Admin - Users - Render User List
adminCtrl.renderUserList = async (req, res) => {
  console.log("--> adminCtrl.renderUserList");
  let users = [];

  try {
    const responseUserList = await sceServiceAPI.getAllUsers();
    if (responseUserList === null || responseUserList === undefined) {
      console.error("Service unavailable: sceServiceAPI.getAllUsers()");
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
adminCtrl.renderAddUserForm = async (req, res) => {
  console.log("--> adminCtrl.renderAddUserForm");
  res.render("admin/user/add-user");
};

// AT-SCE - Admin - Users - Add User
adminCtrl.addUser = async (req, res) => {
  console.log("--> adminCtrl.addUser");

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
      console.debug("--> adminCtrl.addUser - Validations error");
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

    // Call Create USER - POST /api/v1/users endpoint
    await sceServiceAPI.createUser(request).then((result) => {
      if (!result) {
        console.error("Service unavailable: sceServiceAPI.createUser()");
        req.flash("error_msg", "Service unavailable");
        res.redirect("/admin/user");
      }
      console.debug("Result-->", result);
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
adminCtrl.renderEditUserForm = async (req, res) => {
  console.log("--> adminCtrl.renderEditUserForm", req.params.id);
  let user = [];

  try {
    const responseUserbyId = await sceServiceAPI.getUserById(req.params.id);
    if (!responseUserbyId) {
      console.error("Service unavailable: sceServiceAPI.getUserById()");
      req.flash("error_msg", "Service unavaible");
    } else {
      user = responseUserbyId.data;
      console.debug(JSON.stringify(responseUserbyId.data));
    }
  } catch (err) {
    console.err(err.message);
  } finally {
    res.render("admin/user/edit-user", { user });
  }
};

// AT-SCE - Admin - Users - Edit User
adminCtrl.updateUser = async (req, res) => {
  console.log("--> adminCtrl.updateUser");

  const user_id = req.params.id;
  console.log("--> user id:" + user_id);
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
      console.debug("--> adminCtrl.updateUser - Validations error");
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
    //console.debug("Request-->", request);

    // Call Update USER - PUT /api/v1/users endpoint
    await sceServiceAPI.updateUser(request).then((result) => {
      if (!result) {
        console.error("Service unavailable: sceServiceAPI.updateUser()");
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
adminCtrl.deleteUser = async (req, res) => {
  console.log("--> adminCtrl.deleteUser");
  const user_id = req.params.id;
  console.debug(user_id);

  try {
    const response = await sceServiceAPI.deleteUser(user_id);
    if (!response) {
      console.error("Service unavailable: sceServiceAPI.deleteUser()");
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

module.exports = adminCtrl;
