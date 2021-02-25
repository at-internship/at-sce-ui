/**
 * AT SCE UI - AT Admin Controller.
 * Copyright 2021 AgileThought, Inc.
 *
 * General functions for at-admin-controller.
 *
 *
 * @version 1.0
 */

 // AT Admin Controller
const adminCtrl = {};

// MICROSERVICE - HEROKU - SCE API
const sceServiceAPI = require("../services/at-sce-api.service");

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
        user_name,
        user_firstName,
        user_lastName,
        user_email,
        user_password,
        user_status,
      } = req.body;
  
      //const userErrors = [];
  
      let users;
  
      let request = {
        name: user_name,
        firstName: user_firstName,
        lastName: user_lastName,
        email: user_email,
        password: user_password,
        status: parseInt(user_status),
      };
  
      // Send data to microservice
      await sceServiceAPI.addUser(request).then((result) => {
        //Mensaje
        console.log(result);
      });
      // Redirect
      req.flash("success_msg", "User Added Successfully");
      res.redirect("/admin/user");
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.data) {
        let errorMsg = err.response.data.message;
        req.flash("error_msg", errorMsg);
      }
      res.redirect("/admin/user/add");
    }
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
    if (!user_id) {
      req.flash("error_msg", "Not Authorized");
      return res.redirect("/admin/user");
    }
  
    const {
      user_name,
      user_firstName,
      user_lastName,
      user_email,
      user_status,
    } = req.body;
    const userErrors = [];
  
    // Validations
    if (!user_name) {
      userErrors.push({ text: "Please Type a Name." });
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
  
    if (!user_status) {
      userErrors.push({ text: "Please Type a Status." });
    }
  
    if (userErrors.length > 0) {
      res.render("admin/user/edit-user", {
        userErrors,
        user_id,
        user_name,
        user_firstName,
        user_lastName,
        user_email,
        user_status,
      });
    }
    // Send data to microservice
  
    // Redirect
    req.flash("success_msg", "User Updated Successfully");
    res.redirect("/admin/user");
  };
  
  // AT-SCE - Admin - Users - Delete User
  adminCtrl.deleteUser = async (req, res) => {
    console.log("--> adminCtrl.deleteUser");
  
    try {
      const errors = [];
  
      let user_id = req.params.id;
  
      // Redirect
      req.flash("success_msg", "User Deleted Successfully");
    } catch (err) {
      console.log(err.response);
      if (err.response && err.response.data) {
        let errorMsg = err.response.data.message;
        req.flash("error_msg", errorMsg);
      }
      res.redirect("/admin/user");
    }
  };
  
  module.exports = adminCtrl;